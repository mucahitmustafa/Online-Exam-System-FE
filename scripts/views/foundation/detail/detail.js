define([
    'jquery',
    'underscore',
    'backbone',
    'text!./detail.html',
    './students/detail',
    './exams/detail',
    './examLogins/detail',
    './waitingStudents/detail',
],
function($, _, Backbone, FoundationDetailTemplate, StudentsPanelView, ExamsPanelView, ExamLoginsPanelView, WaitingStudentsPanelView) {

    var FoundationDetailView = Backbone.View.extend({

        el: '.container',
        events: {
        },

        initialize: function (options) {
            this.template = _.template(FoundationDetailTemplate);
            this.model = options.model;
            this.apiKey = options.apiKey;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));

            var waitingStudentsPanelView = new WaitingStudentsPanelView({apiKey: this.apiKey});
            $('.panel-waitingStudents').append(waitingStudentsPanelView.render().$el);

            var studentsPanelView = new StudentsPanelView({apiKey: this.apiKey});
            $('.panel-students').append(studentsPanelView.render().$el);

            var examsPanelView = new ExamsPanelView({apiKey: this.apiKey});
            $('.panel-exams').append(examsPanelView.render().$el);

            var examLoginsPanelView = new ExamLoginsPanelView({apiKey: this.apiKey});
            $('.panel-examLogins').append(examLoginsPanelView.render().$el);
            return this;
        }

    });

    return FoundationDetailView;
});
