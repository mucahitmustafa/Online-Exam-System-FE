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
            "click #btn-examDetails": "examDetails"
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
        },

        examDetails: function(e) {
            this.undelegateEvents();
            e.preventDefault();
            Backbone.history.navigate('student/' + this.studentId + '/examDetail/' + this.model.id, {trigger: true, replace: true});
        }
    });

    return TakenExamListItemView;
});
