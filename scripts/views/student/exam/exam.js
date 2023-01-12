define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./exam.html',
    './question',
    'views/student/home/home'
],
function($, _, Backbone, Properties, ExamTemplate, QuestionView, StudentHomeView) {

    var ExamView = Backbone.View.extend({

        el: '.container',
        model: undefined,
        events: {
            "click #btn-endExam": "endExam"
        },

        initialize: function (options) {
            this.template = _.template(ExamTemplate);
            this.model = options.model;
            this.studentModel = options.studentModel;
            this.questions = [];
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));

            var self = this;
            fetch(Properties.APIAddress + '/questions/byExam/' + this.model.id, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(function(response) {
                response.map(question => {
                    self.questions.push(question.id);
                    var questionView = new QuestionView({ model: question });
                    $('.list-questions').append(questionView.render().$el);
                });
            });
            return this;
        },

        endExam: function(e) {
            var answers = "";
            this.questions.forEach(qid => {
                var _answer = document.querySelector('input[name="q' + qid + 'Answers"]:checked');
                answers += (_answer ? _answer.value : '#') + ",";
            });
            answers = answers.substring(0, answers.length - 1);
            var self = this;

            fetch(Properties.APIAddress + '/examLogins', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'examId': this.model.id, 'studentId': this.studentModel.id, 'answers': answers})
            }).then(self.backToHome());
        },

        backToHome: function() {
            var homeView = new StudentHomeView();
            homeView.render();
        }
    });

    return ExamView;
});
