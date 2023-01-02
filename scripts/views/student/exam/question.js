define([
    'jquery',
    'underscore',
    'backbone',
    'text!./question.html'
],
function($, _, Backbone, QuestionTemplate) {

    var QuestionView = Backbone.View.extend({

        model: undefined,
        tagName: 'li',
        events: {
        },

        initialize: function () {
            console.log("QuestionView is being initialized...");
            this.template = _.template(QuestionTemplate);
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        }
    });

    return QuestionView;
});
