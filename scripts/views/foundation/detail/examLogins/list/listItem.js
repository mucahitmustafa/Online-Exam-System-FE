define([
    'jquery',
    'underscore',
    'backbone',
    'text!./listItem.html'
],
function($, _, Backbone, ExamLoginListItemTemplate) {

    var ExamLoginListItemView = Backbone.View.extend({

        model: undefined,
        tagName: 'tr',
        events: {
            "click #btn-examDetails": "examDetails"
        },

        initialize: function (options) {
            this.template = _.template(ExamLoginListItemTemplate);
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },

        examDetails: function(e) {
            e.preventDefault();
            Backbone.history.navigate('foundation/examLoginDetail/' + this.model.id, {trigger: true});
        }
    });

    return ExamLoginListItemView;
});
