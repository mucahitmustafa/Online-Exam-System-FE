define([
    'jquery',
    'underscore',
    'backbone',
    'text!./add.html'
],
function($, _, Backbone, StudentAddTemplate) {

    var StudentAddView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentAddView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentAddTemplate, {} ));
        }

    });

    return StudentAddView;
});
