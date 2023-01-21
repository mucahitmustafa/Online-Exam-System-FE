define([
    'jquery',
    'underscore',
    'backbone',
    'text!./listItem.html'
],
function($, _, Backbone, ExamListItemTemplate) {

    var ExamListItemView = Backbone.View.extend({

        model: undefined,
        tagName: 'tr',
        events: {
            "click #btn-examLogin": "loginExam"
        },

        initialize: function (options) {
            this.template = _.template(ExamListItemTemplate);
            this.model = options.model;
            this.studentId = options.studentId;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },

        loginExam: function(e) {
            e.preventDefault();
            Backbone.history.navigate('#student/' + this.studentId + '/exam/' + this.model.id, {trigger: true});
        }
    });

    return ExamListItemView;
});
