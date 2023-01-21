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
            return this;
        },

        render: function () {
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
                $('#alert-fillAlFields').hide();
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
            var question = {'text': '', 'answers': ['', '', '', ''], 'correctAnswerIndex': 0};
            let questionListItem = new QuestionListItem(question);
            $('.list-questions').append(questionListItem.render().$el);
            e.preventDefault();
        },

        saveExam: function(e) {
            $('#alert-fillAlFields').hide();
            let index = 1;
            var questions = [];
            $(".question").map(function() {
                let qText = $(this).children('#txt-question').val();
                let qAnswerA = $(this).children('#txt-question-answerA').val();
                let qAnswerB = $(this).children('#txt-question-answerB').val();
                let qAnswerC = $(this).children('#txt-question-answerC').val();
                let qAnswerD = $(this).children('#txt-question-answerD').val();
                let qCorrect = $(this).children('#txt-question-answerCorrect').val();
                let qScore = $(this).children('#txt-question-score').val();
                if (qText == "" || (qAnswerA == "" && qAnswerB == "" && qAnswerC == "" && qAnswerD == "") || qCorrect == "" || qScore == "") return;

                questions.push(
                    {'index': index, 'score': qScore, 'text': qText, 'answers': [qAnswerA, qAnswerB, qAnswerC, qAnswerD], 'correctAnswerIndex': ['A', 'B', 'C', 'D'].indexOf(qCorrect)}
                );

                index += 1;
                return this.innerHTML;
            }).get();

            var name = $('#txt-name').val();
            var startDate = $('#txt-startDate').val();
            var endDate = $('#txt-endDate').val();

            if (name == "" || startDate == "" || endDate == "" || questions.length == 0) {
                $('#alert-fillAlFields').show();
                e.preventDefault();
                return;
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
            e.preventDefault();
            return this;
        },

        backToHome: function(e) {
            Backbone.history.navigate('#foundation/detail', {trigger: true});
            if (e) e.preventDefault();
        }
    });

    return ExamUpdateView;
});
