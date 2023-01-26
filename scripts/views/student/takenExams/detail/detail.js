define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./detail.html'
],
function($, _, Backbone, Properties, ExamLoginDetailTemplate) {

    var ExamLoginDetailView = Backbone.View.extend({

        el: '.container',
        events: {
            "click #btn-backToHome": "backToHome",
        },

        initialize: function (options) {
            this.template = _.template(ExamLoginDetailTemplate);
            this.examLoginId = options.examLoginId;
            return this;
        },

        render: function () {
            fetch(Properties.APIAddress + '/examLogins/' + this.examLoginId, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                this.model = response;
                this.$el.html(this.template(this.model));
            });
            return this;
        },

        backToHome: function(e) {
            e.preventDefault();
            Backbone.history.navigate('#student/' + this.model.studentId, {trigger: true, replace: true});
        }
    });

    return ExamLoginDetailView;
});
