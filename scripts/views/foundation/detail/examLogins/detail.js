define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./detail.html',
    './list/listItem',
],
function($, _, Backbone, Properties, ExamLoginsPanelTemplate, ExamLoginListItemView) {

    var ExamLoginsPanelView = Backbone.View.extend({

        apiKey: undefined,
        events: {

        },

        initialize: function (options) {
            this.template = _.template(ExamLoginsPanelTemplate);
            this.apiKey = options.apiKey;
        },

        render: function () {
            this.$el.html(this.template());

            fetch(Properties.APIAddress + '/examLogins/', {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                }
            }).then(response => response.json()).then(function(response) {
                response.content.map(examLogin => {
                    var examLoginListItemView = new ExamLoginListItemView({ model: examLogin, apiKey: this.apiKey });
                    $('.list-examLogins').append(examLoginListItemView.render().$el);
                });
            });

            return this;
        }

    });

    return ExamLoginsPanelView;
});
