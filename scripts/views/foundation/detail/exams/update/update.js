define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./update.html'
],
function($, _, Backbone, Properties, ExamUpdateTemplate) {

    var ExamUpdateView = Backbone.View.extend({

        el: '.container',
        apiKey: undefined,
        events: {
            "click #btn-saveExam": "saveExam",
            "click #btn-backToHome": "backToHome",
        },

        initialize: function (options) {
            this.template = _.template(ExamUpdateTemplate);
            this.apiKey = options.apiKey;
            this.id = options.id;
            return this;
        },

        render: function () {
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
                    if (response.length != 5) return;
    
                    var q1 = response[0];
                    var q2 = response[1];
                    var q3 = response[2];
                    var q4 = response[3];
                    var q5 = response[4];
    
                    $('#txt-question1').val(q1.text);
                    $('#txt-question2').val(q2.text);
                    $('#txt-question3').val(q3.text);
                    $('#txt-question4').val(q4.text);
                    $('#txt-question5').val(q5.text);
    
                    $('#txt-question1-answerA').val(q1.answers[0])
                    $('#txt-question1-answerB').val(q1.answers[1])
                    $('#txt-question1-answerC').val(q1.answers[2])
                    $('#txt-question1-answerD').val(q1.answers[3])
    
                    $('#txt-question2-answerB').val(q2.answers[1])
                    $('#txt-question2-answerC').val(q2.answers[2])
                    $('#txt-question2-answerA').val(q2.answers[0])
                    $('#txt-question2-answerD').val(q2.answers[3])
    
                    $('#txt-question3-answerA').val(q3.answers[0])
                    $('#txt-question3-answerB').val(q3.answers[1])
                    $('#txt-question3-answerC').val(q3.answers[2])
                    $('#txt-question3-answerD').val(q3.answers[3])
    
                    $('#txt-question4-answerA').val(q4.answers[0])
                    $('#txt-question4-answerB').val(q4.answers[1])
                    $('#txt-question4-answerC').val(q4.answers[2])
                    $('#txt-question4-answerD').val(q4.answers[3])
    
                    $('#txt-question5-answerA').val(q5.answers[0])
                    $('#txt-question5-answerB').val(q5.answers[1])
                    $('#txt-question5-answerC').val(q5.answers[2])
                    $('#txt-question5-answerD').val(q5.answers[3])
                    
                    $('#txt-question1-answerCorrect').val(['A', 'B', 'C', 'D'][q1.correctAnswerIndex]);
                    $('#txt-question2-answerCorrect').val(['A', 'B', 'C', 'D'][q2.correctAnswerIndex]);
                    $('#txt-question3-answerCorrect').val(['A', 'B', 'C', 'D'][q3.correctAnswerIndex]);
                    $('#txt-question4-answerCorrect').val(['A', 'B', 'C', 'D'][q4.correctAnswerIndex]);
                    $('#txt-question5-answerCorrect').val(['A', 'B', 'C', 'D'][q5.correctAnswerIndex]);
                });
            });

            return this;
        },

        saveExam: function(e) {
            var name = $('#txt-name').val();
            var startDate = $('#txt-startDate').val();
            var endDate = $('#txt-endDate').val();

            var q1text = $('#txt-question1').val();
            var q2text = $('#txt-question2').val();
            var q3text = $('#txt-question3').val();
            var q4text = $('#txt-question4').val();
            var q5text = $('#txt-question5').val();

            var q1answerA = $('#txt-question1-answerA').val();
            var q1answerB = $('#txt-question1-answerB').val();
            var q1answerC = $('#txt-question1-answerC').val();
            var q1answerD = $('#txt-question1-answerD').val();

            var q2answerA = $('#txt-question2-answerA').val();
            var q2answerB = $('#txt-question2-answerB').val();
            var q2answerC = $('#txt-question2-answerC').val();
            var q2answerD = $('#txt-question2-answerD').val();

            var q3answerA = $('#txt-question3-answerA').val();
            var q3answerB = $('#txt-question3-answerB').val();
            var q3answerC = $('#txt-question3-answerC').val();
            var q3answerD = $('#txt-question3-answerD').val();

            var q4answerA = $('#txt-question4-answerA').val();
            var q4answerB = $('#txt-question4-answerB').val();
            var q4answerC = $('#txt-question4-answerC').val();
            var q4answerD = $('#txt-question4-answerD').val();

            var q5answerA = $('#txt-question5-answerA').val();
            var q5answerB = $('#txt-question5-answerB').val();
            var q5answerC = $('#txt-question5-answerC').val();
            var q5answerD = $('#txt-question5-answerD').val();

            var q1correct = $('#txt-question1-answerCorrect').val();
            var q2correct = $('#txt-question2-answerCorrect').val();
            var q3correct = $('#txt-question3-answerCorrect').val();
            var q4correct = $('#txt-question4-answerCorrect').val();
            var q5correct = $('#txt-question5-answerCorrect').val();

            var questions = [
                {'text': q1text, 'answers': [q1answerA, q1answerB, q1answerC, q1answerD], 'correctAnswerIndex': ['A', 'B', 'C', 'D'].indexOf(q1correct)},
                {'text': q2text, 'answers': [q2answerA, q2answerB, q2answerC, q2answerD], 'correctAnswerIndex': ['A', 'B', 'C', 'D'].indexOf(q2correct)},
                {'text': q3text, 'answers': [q3answerA, q3answerB, q3answerC, q3answerD], 'correctAnswerIndex': ['A', 'B', 'C', 'D'].indexOf(q3correct)},
                {'text': q4text, 'answers': [q4answerA, q4answerB, q4answerC, q4answerD], 'correctAnswerIndex': ['A', 'B', 'C', 'D'].indexOf(q4correct)},
                {'text': q5text, 'answers': [q5answerA, q5answerB, q5answerC, q5answerD], 'correctAnswerIndex': ['A', 'B', 'C', 'D'].indexOf(q5correct)}    
            ];

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
            Backbone.history.navigate('#foundation/' + this.apiKey);
        }
    });

    return ExamUpdateView;
});
