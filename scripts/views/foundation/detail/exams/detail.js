define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./detail.html',
    './list/listItem',
    './add/add'
],
function($, _, Backbone, Properties, ExamsPanelTemplate, ExamListItemView, ExamAddView) {

    var ExamsPanelView = Backbone.View.extend({

        apiKey: undefined,
        events: {
            "click #btn-newExam": "newExam"
        },

        initialize: function (options) {
            this.template = _.template(ExamsPanelTemplate);
            this.apiKey = options.apiKey;
        },

        render: function () {
            this.$el.html(this.template());
            var self = this;

            fetch(Properties.APIAddress + '/exams/', {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                }
            }).then(response => response.json()).then(function(response) {
                response.content.map(exam => {
                    var examListItemView = new ExamListItemView({ model: exam, apiKey: self.apiKey });
                    $('.list-exams').append(examListItemView.render().$el);
                });
            });

            return this;
        },

        newExam: function(e) {
            new ExamAddView({apiKey: this.apiKey});
        }

    });

    return ExamsPanelView;
});
