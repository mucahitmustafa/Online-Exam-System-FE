define([
    'jquery',
    'underscore',
    'backbone',
    'text!./detail.html'
],
function($, _, Backbone, FoundationDetailTemplate) {

    var FoundationDetailView = Backbone.View.extend({

        el: '.container',
        model: undefined,
        events: {

        },

        initialize: function () {
            console.log("FoundationDetailView is being initialized...");
            this.template = _.template(FoundationDetailTemplate);

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
        }

    });

    return FoundationDetailView;
});
