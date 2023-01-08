define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./detail.html',
    './students/detail',
    './exams/detail',
    './examLogins/detail'
],
function($, _, Backbone, Properties, FoundationDetailTemplate, StudentsPanelView, ExamsPanelView, ExamLoginsPanelView) {

    var FoundationDetailView = Backbone.View.extend({

        el: '.container',
        model: undefined,
        apiKey: undefined,
        events: {

        },

        initialize: function (options) {
            this.template = _.template(FoundationDetailTemplate);
            this.model = options.model;
            this.apiKey = options.apiKey;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));

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
