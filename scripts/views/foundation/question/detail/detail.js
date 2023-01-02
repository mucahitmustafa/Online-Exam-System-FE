define([
    'jquery',
    'underscore',
    'backbone',
    'text!./detail.html'
],
function($, _, Backbone, QuestionDetailTemplate) {

    var QuestionDetailView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("QuestionDetailView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(QuestionDetailTemplate, {} ));
        }

    });

    return QuestionDetailView;
});
