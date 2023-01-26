define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./statistics.html'
],
function($, _, Backbone, Properties, ExamStatisticsTemplate) {

    var ExamStatisticsView = Backbone.View.extend({

        el: '.container',
        apiKey: undefined,
        events: {
            "click #btn-backToHome": "backToHome",
        },

        initialize: function (options) {
            this.template = _.template(ExamStatisticsTemplate);
            this.apiKey = options.apiKey;
            this.examId = options.examId;
            return this;
        },

        render: function () {
            fetch(Properties.APIAddress + '/exams/statistics/' + this.examId, {
                async: false,
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(response => response.json()).then(response => {
                this.model = response;
                this.$el.html(this.template(this.model));

                for (var i in response.questionStatistic) {
                    $('.list-questionStatistics').append('<tr></tr><td>' + i +'. Question</td><td>' +response.questionStatistic[i] + '</td></tr>');
                }

                
            });
            return this;
        },

        backToHome: function(e) {
            this.undelegateEvents();
            e.preventDefault();
            Backbone.history.navigate('#foundation/detail', {trigger: true, replace: true});
        }
    });

    return ExamStatisticsView;
});
