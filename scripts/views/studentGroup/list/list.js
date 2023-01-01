define([
    'jquery',
    'underscore',
    'backbone',
    'text!./list.html'
],
function($, _, Backbone, StudentGroupListTemplate) {

    var StudentGroupListView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentGroupListView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentGroupListTemplate, {} ));
        }

    });

    return StudentGroupListView;
});
