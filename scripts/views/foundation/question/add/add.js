define([
    'jquery',
    'underscore',
    'backbone',
    'text!./add.html'
],
function($, _, Backbone, QuestionAddTemplate) {

    var QuestionAddView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("QuestionAddView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(QuestionAddTemplate, {} ));
        }

    });

    return QuestionAddView;
});
