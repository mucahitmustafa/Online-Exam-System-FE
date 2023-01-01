define([
    'jquery',
    'underscore',
    'backbone',
    'text!./list.html'
],
function($, _, Backbone, ExamLoginListTemplate) {

    var ExamLoginListView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("ExamLoginListView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(ExamLoginListTemplate, {} ));
        }

    });

    return ExamLoginListView;
});
