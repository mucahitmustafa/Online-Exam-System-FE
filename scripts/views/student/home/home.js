define([
    'jquery',
    'underscore',
    'backbone',
    'text!./home.html',
    'properties',
    '../examList/listItem'
],
function($, _, Backbone, StudentHomeTemplate, Properties, ExamListItemView) {

    var StudentHomeView = Backbone.View.extend({

        el: '.container',
        model: undefined,
        events: {

        },

        initialize: function (options) {
            this.template = _.template(StudentHomeTemplate);
            this.id = options.id;
            return this;
        },

        render: function () {
            fetch(Properties.APIAddress + '/students/' + this.id, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                this.model = response;
                this.$el.html(this.template(this.model));
                var self = this;
                fetch(Properties.APIAddress + '/exams/byStudent/' + this.model.id, {
                    async: false,
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                }).then(response => response.json()).then(function(response) {
                    response.map(exam => {
                        var examListItemView = new ExamListItemView({ model: exam, studentId: self.id});
                        $('.list-exams').append(examListItemView.render().$el);
                    });
                });
            });

            return this;
        },

    });

    return StudentHomeView;
});
