define([
    'jquery',
    'underscore',
    'backbone',
    'text!./list.html'
],
function($, _, Backbone, QuestionListTemplate) {

    var QuestionListView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("QuestionListView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(QuestionListTemplate, {} ));
        }

    });

    return QuestionListView;
});
