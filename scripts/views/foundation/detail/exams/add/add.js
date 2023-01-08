define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./add.html',
    '../detail'
],
function($, _, Backbone, Properties, ExamAddTemplate, ExamsPanelView) {

    var ExamAddView = Backbone.View.extend({

        el: '.container',
        apiKey: undefined,
        events: {
            "click #btn-saveExam": "saveExam",
            "click #btn-backExamPanel": "backExamPanel",
        },

        initialize: function (options) {
            this.template = _.template(ExamAddTemplate);
            this.apiKey = options.apiKey;
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        saveExam: function(e) {
            var name = $('#txt-name').val();
            var startDate = $('#txt-startDate').val();
            var endDate = $('#txt-endDate').val();
            var duration = $('#txt-duration').val();

            fetch(Properties.APIAddress + '/exams/', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'name': name, 'startDate': startDate, 'endDate': endDate, 'duration': duration, 'questions': []})
            }).then(openEditExamPage());
        },

        backExamPanel: function(e) {
            var examsPanelView = new ExamsPanelView({apiKey: this.apiKey});
            $('.panel-exams').append(examsPanelView.render().$el);
        },

        openEditExamPage() {
            // TODO: select students and add questions.

        }
    });

    return ExamAddView;
});
