define([
    'jquery',
    'underscore',
    'backbone',
    'text!./detail.html'
],
function($, _, Backbone, StudentDetailTemplate) {

    var StudentDetailView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentDetailView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentDetailTemplate, {} ));
        }

    });

    return StudentDetailView;
});
