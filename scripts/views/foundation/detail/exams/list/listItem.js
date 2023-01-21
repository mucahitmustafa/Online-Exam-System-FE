define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./listItem.html'
],
function($, _, Backbone, Properties, ExamListItemTemplate) {

    var ExamListItemView = Backbone.View.extend({

        model: undefined,
        apiKey: undefined,
        tagName: 'tr',
        events: {
            "click #btn-editExam": "editExam",
            "click #btn-deleteExam": "deleteExam",
            "click #btn-examStatistics": "examStatistics"
        },

        initialize: function (options) {
            this.template = _.template(ExamListItemTemplate);
            this.apiKey = options.apiKey;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },
        
        editExam: function(e) {
            e.preventDefault();
            Backbone.history.navigate('#foundation/editExam/' + this.model.id, { trigger: true });
        }, 
        
        deleteExam: function(e) {
            e.preventDefault();
            fetch(Properties.APIAddress + '/exams/' + this.model.id, {
                async: false,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                }
            }).then(() => {
                alert("Exam " + this.model.id + " deleted.");
                this.$el.html("");
            });
        },

        examStatistics: function(e) {
            e.preventDefault();
            Backbone.history.navigate('#foundation/examStatistics/' + this.model.id, { trigger: true });
        }
    });

    return ExamListItemView;
});
