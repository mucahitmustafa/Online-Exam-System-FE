define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./listItem.html'
],
function($, _, Backbone, Properties, StudentListItemTemplate) {

    var StudentListItemView = Backbone.View.extend({

        tagName: 'tr',
        events: {
            "click #btn-editStudent": "editStudent",
            "click #btn-deleteStudent": "deleteStudent"
        },

        initialize: function (options) {
            this.template = _.template(StudentListItemTemplate);
            this.apiKey = options.apiKey;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },
        
        editStudent: function(e) {
            Backbone.history.navigate('#foundation/' + this.apiKey + '/editStudent/' + this.model.id);
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
