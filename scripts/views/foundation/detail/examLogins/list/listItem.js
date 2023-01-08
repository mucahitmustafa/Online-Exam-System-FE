define([
    'jquery',
    'underscore',
    'backbone',
    'text!./listItem.html'
],
function($, _, Backbone, ExamLoginListItemTemplate) {

    var ExamLoginListItemView = Backbone.View.extend({

        model: undefined,
        tagName: 'li',
        events: {
        },

        initialize: function () {
            this.template = _.template(ExamLoginListItemTemplate);
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        }
    });

    return ExamLoginListItemView;
});
