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
            this.studentId = options.id;
            this.examId = options.examId;
            this.questions = [];
            return this;
        },

        render: function () {
            var self = this;
            fetch(Properties.APIAddress + '/exams/' + this.examId, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                this.model = response;
                this.$el.html(this.template(this.model));
                fetch(Properties.APIAddress + '/questions/byExam/' + this.examId, {
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
            });

            return this;
        },

        endExam: function(e) {
            this.undelegateEvents();
            e.preventDefault();
            var answers = "";
            this.questions.forEach(qid => {
                var _answer = document.querySelector('input[name="q' + qid + 'Answers"]:checked');
                answers += (_answer ? _answer.value : '#') + ",";
            });
            answers = answers.substring(0, answers.length - 1);

            fetch(Properties.APIAddress + '/examLogins', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({'examId': this.examId, 'studentId': this.studentId, 'answers': answers}),
            }).then(response => response.json()).then(response => Backbone.history.navigate('#student/' + response.studentId, {trigger: true, replace: true}));
        }
    });

    return ExamView;
});
