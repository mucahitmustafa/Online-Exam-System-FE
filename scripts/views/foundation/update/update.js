define([
    'jquery',
    'underscore',
    'backbone',
    'text!./update.html'
],
function($, _, Backbone, FoundationUpdateTemplate) {

    var FoundationUpdateView = Backbone.View.extend({

        el: '.container',
        events: {

        },

        initialize: function () {
            console.log("FoundationUpdateView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(FoundationUpdateTemplate, {} ));
        }

    });

    return FoundationUpdateView;
});
