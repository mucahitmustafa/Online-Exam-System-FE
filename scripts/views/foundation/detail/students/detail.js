define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./detail.html',
    './list/listItem',
    './add/add'
],
function($, _, Backbone, Properties, StudentsPanelTemplate, StudentListItemView, StudentAddView) {

    var StudentsPanelView = Backbone.View.extend({

        apiKey: undefined,
        events: {
            "click #btn-newStudent": "newStudent"
        },

        initialize: function (options) {
            this.template = _.template(StudentsPanelTemplate);
            this.apiKey = options.apiKey;
            return this;
        },

        render: function () {
            this.$el.html(this.template());
            var self = this;

            fetch(Properties.APIAddress + '/students/', {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                }
            }).then(response => response.json()).then(function(response) {
                response.content.map(student => {
                    var studentListItemView = new StudentListItemView({ model: student, apiKey: self.apiKey });
                    $('.list-students').append(studentListItemView.render().$el);
                });
            });

            return this;
        },

        newStudent: function(e) {
            new StudentAddView({apiKey: this.apiKey});
        }
    });

    return StudentsPanelView;
});
