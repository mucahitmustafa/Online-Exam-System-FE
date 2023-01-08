define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./exam.html',
    './question'
],
function($, _, Backbone, Properties, ExamTemplate, QuestionView) {

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
            this.render();
            this.questions = [];
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

        },

        endExam: function(e) {
            var answers = "";
            this.questions.forEach(qid => {
                answers += document.querySelector('input[name="q' + qid + 'Answers"]:checked').value + ",";
            });
            answers = answers.substring(0, answers.length - 1);

            fetch(Properties.APIAddress + '/examLogins', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'examId': this.model.id, 'studentId': this.studentModel.id, 'answers': answers})
            }).then(this.backToHome());
        },

        backToHome: function() {
            new StudentHomeView({model: this.studentModel});
        }
    });

    return ExamView;
});
