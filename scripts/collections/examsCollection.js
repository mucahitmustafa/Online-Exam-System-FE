define([
    'backbone', 'models/examModel'
], function(
    Backbone, ExamModel
) {
    var ExamCollection = Backbone.Collection.extend({

        model: ExamModel,

        url: '/api/exams/',

        parse: function(response) {
            return response.content;
        },

    });

    return ExamCollection;
});