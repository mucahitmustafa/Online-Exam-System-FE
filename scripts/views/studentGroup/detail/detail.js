define([
    'jquery',
    'underscore',
    'backbone',
    'text!./detail.html'
],
function($, _, Backbone, StudentGroupDetailTemplate) {

    var StudentGroupDetailView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentGroupDetailView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentGroupDetailTemplate, {} ));
        }

    });

    return StudentGroupDetailView;
});
