define([
    'jquery',
    'underscore',
    'backbone',
    'text!./singleExamView.html'
],
function($, _, Backbone, SingleExamTemplate) {

    var SingleExamView = Backbone.View.extend({

        tagName: 'li',
        model: undefined,

        events: {

        },

        initialize: function () {
            console.log("SingleExamView is being initialized...");
            this.template = _.template(SingleExamTemplate);

            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }

    });

    return SingleExamView;
});
