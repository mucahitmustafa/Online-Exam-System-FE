define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./add.html',
    'views/foundation/detail/detail',
    '../update/update'
],
function($, _, Backbone, Properties, ExamAddTemplate, FoundationDetailView, UpdateExamView) {

    var ExamAddView = Backbone.View.extend({

        el: '.container',
        apiKey: undefined,
        events: {
            "click #btn-saveExam": "saveExam",
            "click #btn-backToHome": "backToHome",
        },

        initialize: function (options) {
            this.template = _.template(ExamAddTemplate);
            this.apiKey = options.apiKey;
            this.foundationModel = options.foundationModel;
            return this;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },

        saveExam: function(e) {
            var name = $('#txt-name').val();
            var startDate = $('#txt-startDate').val();
            var endDate = $('#txt-endDate').val();

            fetch(Properties.APIAddress + '/exams/', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'name': name, 'startDate': startDate, 'endDate': endDate, 'questions': []})
            }).then(response => openEditExamPage(response));
        },

        backToHome: function(e) {
            var foundationDetailView = new FoundationDetailView({apiKey: this.apiKey, model: this.foundationModel});
            foundationDetailView.render();
        },

        openEditExamPage(model) {
            var updateExamView = new UpdateExamView({apiKey: this.apiKey, model: model, foundationModel: this.foundationModel});
            updateExamView.render();
        }
    });

    return ExamAddView;
});
