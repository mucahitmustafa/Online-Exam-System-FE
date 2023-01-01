define([
    'jquery',
    'underscore',
    'backbone',
    'text!./add.html'
],
function($, _, Backbone, StudentGroupAddTemplate) {

    var StudentGroupAddView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("StudentGroupAddView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentGroupAddTemplate, {} ));
        }

    });

    return StudentGroupAddView;
});
