define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./list.html',
    'collections/examsPageableCollection',
    './singleExamView'
],
function($, _, Backbone, Properties, ExamListTemplate, ExamsPageableCollection, SingleExamView) {

    var ExamListView = Backbone.View.extend({

        el: '.container',
        model: undefined,

        events: {


        },

        initialize: function () {
            console.log("ExamListView is being initialized...");
            this.template = _.template(ExamListTemplate);

            this.render();
        },

        render: function () {
            this.$el.html(this.template());

            var examsPageableCollection = new ExamsPageableCollection();
            examsPageableCollection.fetch({
                async: false,
                headers: {'api-key': Properties.APIKey}
            });
            examsPageableCollection.models.forEach(exam => {
                var singleExamView = new SingleExamView({model: exam});
                $('#exams').append(singleExamView.render().$el);
            });
        }

    });

    return ExamListView;
});
