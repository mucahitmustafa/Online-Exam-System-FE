define([
    'jquery',
    'underscore',
    'backbone',
    'text!./update.html'
],
function($, _, Backbone, StudentUpdateTemplate) {

    var StudentUpdateView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentUpdateView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentUpdateTemplate, {} ));
        }

    });

    return StudentUpdateView;
});
