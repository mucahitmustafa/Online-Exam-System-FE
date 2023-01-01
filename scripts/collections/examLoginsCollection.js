define([
    'backbone', 'properties', 'models/examLoginModel'
], function(
    Backbone, Properties, ExamLoginModel
) {
    var ExamLoginCollection = Backbone.Collection.extend({

        model: ExamLoginModel,

        url: Properties.APIAddress + '/examLogins/',

        parse: function(response) {
            return response.content;
        },

    });

    return ExamLoginCollection;
});