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
            "click #btn-approveStudent": "approveStudent",
            "click #btn-rejectStudent": "rejectStudent"
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
        
        approveStudent: function(e) {
            fetch(Properties.APIAddress + '/students/approve/' + this.model.id, {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                }
            }).then(() => {
                this.$el.html("");
            });
            e.preventDefault();
        }, 
        
        rejectStudent: function(e) {
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
            e.preventDefault();
        }
    });

    return StudentListItemView;
});
