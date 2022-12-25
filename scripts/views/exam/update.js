define([
    'jquery',
    'underscore',
    'backbone',
    'text!./update.html'
],
function($, _, Backbone, ExamUpdateTemplate) {

    var ExamUpdateView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("ExamUpdateView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(ExamUpdateTemplate, {} ));
        }

    });

    return ExamUpdateView;
});
