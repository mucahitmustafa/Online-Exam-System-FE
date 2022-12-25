define([
    'jquery',
    'underscore',
    'backbone',
    'text!./exam.html'
],
function($, _, Backbone, ExamTemplate) {

    var ExamView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("ExamView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(ExamTemplate, {} ));
        }

    });

    return ExamView;
});
