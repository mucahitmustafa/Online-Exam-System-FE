define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./listItem.html'
],
function($, _, Backbone, Properties, QuestionListItemTemplate) {

    var QuestionListItemView = Backbone.View.extend({

        tagName: 'li',
        events: {
        },

        initialize: function (model) {
            this.template = _.template(QuestionListItemTemplate);
            this.model = model;
            return this;
        },

        render: function () {
            this.$el.html(this.template({
                model: this.model,
                correctAnswer: ['A', 'B', 'C', 'D'][this.model.correctAnswerIndex],
                score: this.model.score ? this.model.score : 0
            }));
            return this;
        }
    });

    return QuestionListItemView;
});
                        