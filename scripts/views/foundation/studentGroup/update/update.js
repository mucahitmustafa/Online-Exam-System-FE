define([
    'jquery',
    'underscore',
    'backbone',
    'text!./update.html'
],
function($, _, Backbone, StudentGroupUpdateTemplate) {

    var StudentGroupUpdateView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentGroupUpdateView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentGroupUpdateTemplate, {} ));
        }

    });

    return StudentGroupUpdateView;
});
