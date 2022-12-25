define([
    'jquery',
    'underscore',
    'backbone',
    'text!./list.html'
],
function($, _, Backbone, ExamListTemplate) {

    var ExamListView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("ExamListView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(ExamListTemplate, {} ));
        }

    });

    return ExamListView;
});
