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

        },

        initialize: function () {
            this.template = _.template(ExamTemplate);
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model));

            fetch(Properties.APIAddress + '/questions/byExam/' + this.model.id, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(function(response) {
                response.map(question => {
                    var questionView = new QuestionView({ model: question });
                    $('.list-questions').append(questionView.render().$el);
                });
            });

        }
    });

    return ExamView;
});
