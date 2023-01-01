define([
    'jquery',
    'underscore',
    'backbone',
    'text!./home.html',
    'properties',
    './examList/listItem'
],
function($, _, Backbone, StudentHomeTemplate, Properties, ExamListItemView) {

    var StudentHomeView = Backbone.View.extend({

        el: '.container',
        model: undefined,
        events: {

        },

        initialize: function () {
            console.log("StudentHomeView is being initialized...");
            this.template = _.template(StudentHomeTemplate);
            this.render();
        },

        render: function () {
            this.$el.html(this.template(this.model));

            fetch(Properties.APIAddress + '/exams/byStudent/' + this.model.id, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(function(response) {
                const markup = response.map(exam => {
                    var examListItemView = new ExamListItemView({ model: exam });
                    $('.list-exams').append(examListItemView.render().$el);
                });
            });
        }

    });

    return StudentHomeView;
});
