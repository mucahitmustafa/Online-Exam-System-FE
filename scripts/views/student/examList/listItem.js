define([
    'jquery',
    'underscore',
    'backbone',
    'text!./listItem.html',
    '../exam/exam'
],
function($, _, Backbone, ExamListItemTemplate, ExamView) {

    var ExamListItemView = Backbone.View.extend({

        model: undefined,
        tagName: 'tr',
        events: {
            "click #btn-examLogin": "loginExam"
        },

        initialize: function (options) {
            this.template = _.template(ExamListItemTemplate);
            this.model = options.model;
            this.studentModel = options.studentModel;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },

        loginExam: function(e) {
            var examView = new ExamView({model: this.model, studentModel: this.studentModel});
            examView.render();
        }
    });

    return ExamListItemView;
});
