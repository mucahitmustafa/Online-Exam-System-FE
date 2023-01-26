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
            this.undelegateEvents();
            e.preventDefault();
            Backbone.history.navigate('#foundation/editStudent/' + this.model.id, { trigger: true, replace: true });
        }, 
        
        deleteStudent: function(e) {
            this.undelegateEvents();
            e.preventDefault();
            fetch(Properties.APIAddress + '/students/' + this.model.id, {
                async: false,
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                }
            }).then(() => {
                this.$el.html("");
            });
        }
    });

    return StudentListItemView;
});
