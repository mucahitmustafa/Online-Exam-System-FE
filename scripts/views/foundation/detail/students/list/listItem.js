define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./listItem.html',
    '../update/update'
],
function($, _, Backbone, Properties, StudentListItemTemplate, UpdateStudentView) {

    var StudentListItemView = Backbone.View.extend({

        model: undefined,
        apiKey: undefined,
        tagName: 'tr',
        events: {
            "click #btn-editStudent": "editStudent",
            "click #btn-deleteStudent": "deleteStudent"
        },

        initialize: function (options) {
            this.template = _.template(StudentListItemTemplate);
            this.apiKey = options.apiKey;
            this.foundationModel = options.foundationModel;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },
        
        editStudent: function(e) {
            var updateStudentView = new UpdateStudentView({apiKey: this.apiKey, model: this.model, foundationModel: this.foundationModel });
            updateStudentView.render();
        }, 
        
        deleteStudent: function(e) {
            fetch(Properties.APIAddress + '/students/' + this.model.id, {
                async: false,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                }
            }).then(() => {
                alert("Student " + this.model.id + " deleted.");
                this.$el.html("");
            });
        }
    });

    return StudentListItemView;
});
