define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./listItem.html',
    '../update/update'
],
function($, _, Backbone, Properties, ExamListItemTemplate, UpdateExamView) {

    var ExamListItemView = Backbone.View.extend({

        model: undefined,
        apiKey: undefined,
        tagName: 'tr',
        events: {
            "click #btn-editExam": "editExam",
            "click #btn-deleteExam": "deleteExam"
        },

        initialize: function (options) {
            this.template = _.template(ExamListItemTemplate);
            this.apiKey = options.apiKey;
            this.foundationModel = options.foundationModel;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },
        
        editExam: function(e) {
            var examUpdateView = new UpdateExamView({apiKey: this.apiKey, model: this.model, foundationModel: this.foundationModel});
            examUpdateView.render();
        }, 
        
        deleteExam: function(e) {
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
        }
    });

    return ExamListItemView;
});
