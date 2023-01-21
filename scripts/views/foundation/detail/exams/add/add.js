define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./add.html'
],
function($, _, Backbone, Properties, ExamAddTemplate) {

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
            return this;
        },

        render: function () {
            this.$el.html(this.template());
            $('#alert-fillAlFields').hide();
            return this;
        },

        saveExam: function(e) {
            e.preventDefault();
            $('#alert-fillAlFields').hide();
            var name = $('#txt-name').val();
            var startDate = $('#txt-startDate').val();
            var endDate = $('#txt-endDate').val();
            if (name == "" || startDate == "" || endDate == "") {
                $('#alert-fillAlFields').show();
                return;
            }

            var self = this;
            fetch(Properties.APIAddress + '/exams/', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'name': name, 'startDate': startDate, 'endDate': endDate, 'questions': []})
            }).then(response => response.json()).then(response => self.openEditExamPage(response));
        },

        backToHome: function(e) {
            e.preventDefault();
            Backbone.history.navigate('#foundation/detail', {trigger: true});
        },

        openEditExamPage(response) {
            Backbone.history.navigate('#foundation/editExam/' + response.id, {trigger: true});
        }
    });

    return ExamAddView;
});
