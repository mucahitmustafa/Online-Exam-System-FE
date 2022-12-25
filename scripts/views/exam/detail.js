define([
    'jquery',
    'underscore',
    'backbone',
    'text!./detail.html'
],
function($, _, Backbone, ExamDetailTemplate) {

    var ExamDetailView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("ExamDetailView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(ExamDetailTemplate, {} ));
        }

    });

    return ExamDetailView;
});
