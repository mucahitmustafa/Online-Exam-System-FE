define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./update.html',
    './question/listItem'
],
function($, _, Backbone, Properties, ExamUpdateTemplate, QuestionListItem) {

    var ExamUpdateView = Backbone.View.extend({

        el: '.container',
        apiKey: undefined,
        events: {
            "click #btn-saveExam": "saveExam",
            "click #btn-backToHome": "backToHome",
            "click #btn-addQuestion": "addQuestion"
        },

        initialize: function (options) {
            this.template = _.template(ExamUpdateTemplate);
            this.apiKey = options.apiKey;
            this.id = options.id;
            this.totalQuestions = 0;
            return this;
        },

        render: function () {
            this.totalQuestions = 0;
            this.$el.html("");

            fetch(Properties.APIAddress + '/exams/' + this.id, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                this.model = response;
                this.$el.html(this.template(this.model));
                fetch(Properties.APIAddress + '/questions/byExam/' + this.id, {
                    async: false,
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                }).then(response => response.json()).then(function(response) {
                    for (let i = 0; i < response.length; i++) {
                        let question = response[i];
                        let questionListItem = new QuestionListItem(question);
                        $('.list-questions').append(questionListItem.render().$el);
                    }

                });
            });

            return this;
        },

        addQuestion: function(e) {
            this.totalQuestions += 1;
            var question = {'index': this.totalQuestions, 'text': '', 'answers': ['', '', '', ''], 'correctAnswerIndex': 0};
            let questionListItem = new QuestionListItem(question);
            $('.list-questions').append(questionListItem.render().$el);
        },

        saveExam: function(e) {
            var name = $('#txt-name').val();
            var startDate = $('#txt-startDate').val();
            var endDate = $('#txt-endDate').val();

            var questions = []
            for (let i = 1; i <= this.totalQuestions; i++) {
                var qText = $('#txt-question' + i).val();

                var qAnswerA = $('#txt-question' + i + '-answerA').val();
                var qAnswerB = $('#txt-question' + i + '-answerB').val();
                var qAnswerC = $('#txt-question' + i + '-answerC').val();
                var qAnswerD = $('#txt-question' + i + '-answerD').val();
                var qCorrect = $('#txt-question' + i + '-answerCorrect').val();
                var qScore = $('#txt-question' + i + '-score').val();
                questions.push(
                    {'index': i, 'score': qScore, 'text': qText, 'answers': [qAnswerA, qAnswerB, qAnswerC, qAnswerD], 'correctAnswerIndex': ['A', 'B', 'C', 'D'].indexOf(qCorrect)}
                );
            }

            var self = this;
            fetch(Properties.APIAddress + '/exams/' + this.model.id, {
                async: false,
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'name': name, 'startDate': startDate, 'endDate': endDate, 'questions': questions})
            }).then(self.backToHome());
            return this;
        },

        backToHome: function(e) {
            document.cookie = this.apiKey;
            Backbone.history.navigate('#foundation/detail', {trigger: true});
        }
    });

    return ExamUpdateView;
});
