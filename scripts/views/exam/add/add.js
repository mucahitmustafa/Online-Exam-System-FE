define([
    'jquery',
    'underscore',
    'backbone',
    'text!./add.html'
],
function($, _, Backbone, ExamAddTemplate) {

    var ExamAddView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("ExamAddView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(ExamAddTemplate, {} ));
        }

    });

    return ExamAddView;
});
