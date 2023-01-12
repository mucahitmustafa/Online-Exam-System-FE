define([
    'jquery',
    'underscore',
    'backbone',
    'text!./detail.html',
    './students/detail',
    './exams/detail',
    './examLogins/detail',
    'models/foundationModel'
],
function($, _, Backbone, FoundationDetailTemplate, StudentsPanelView, ExamsPanelView, ExamLoginsPanelView, FoundationModel) {

    var FoundationDetailView = Backbone.View.extend({

        el: '.container',
        events: {
        },

        initialize: function (options) {
            this.template = _.template(FoundationDetailTemplate);
            this.apiKey = options.apiKey;
            this.model = new FoundationModel();
            this.model.fetch({
                async: false,
                headers: {'api-key': this.apiKey}
            });
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
