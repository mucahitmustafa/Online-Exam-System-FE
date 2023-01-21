define([
    'jquery',
    'underscore',
    'backbone',
    'text!./listItem.html'
],
function($, _, Backbone, TakenExamListItemTemplate) {

    var TakenExamListItemView = Backbone.View.extend({

        model: undefined,
        tagName: 'tr',
        events: {
        },

        initialize: function (options) {
            this.template = _.template(TakenExamListItemTemplate);
            this.model = options.model;
            this.studentId = options.studentId;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        }
    });

    return TakenExamListItemView;
});
