define([
    'backbone', 'properties', 'models/questionModel'
], function(
    Backbone, Properties, QuestionModel
) {
    var QuestionCollection = Backbone.Collection.extend({

        model: QuestionModel,

        url: Properties.APIAddress + '/questions/',

        parse: function(response) {
            return response.content;
        },

    });

    return QuestionCollection;
});
