define([
    'jquery',
    'underscore',
    'backbone',
    'text!./list.html'
],
function($, _, Backbone, StudentListTemplate) {

    var StudentListView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentListView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentListTemplate, {} ));
        }

    });

    return StudentListView;
});
