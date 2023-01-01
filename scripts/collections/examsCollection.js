define([
    'backbone', 'properties', 'models/examModel'
], function(
    Backbone, Properties, ExamModel
) {
    var ExamCollection = Backbone.Collection.extend({

        model: ExamModel,

        url: Properties.APIAddress + '/exams/',

        parse: function(response) {
            return response.content;
        },

    });

    return ExamCollection;
});