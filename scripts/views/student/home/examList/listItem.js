define([
    'jquery',
    'underscore',
    'backbone',
    'text!./listItem.html'
],
function($, _, Backbone, ExamListItemTemplate) {

    var ExamListItemView = Backbone.View.extend({

        model: undefined,
        tagName: 'li',
        events: {
            "click #btn-examLogin": "loginExam"
        },

        initialize: function () {
            console.log("ExamListItemView is being initialized...", this.model);
            this.template = _.template(ExamListItemTemplate);
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },

        loginExam: function(e) {
            console.info("Login to exam ", this.model.id);

        }
    });

    return ExamListItemView;
});
