define([
    'jquery',
    'underscore',
    'backbone',
    'text!./update.html'
],
function($, _, Backbone, QuestionUpdateTemplate) {

    var QuestionUpdateView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("QuestionUpdateView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(QuestionUpdateTemplate, {} ));
        }

    });

    return QuestionUpdateView;
});
