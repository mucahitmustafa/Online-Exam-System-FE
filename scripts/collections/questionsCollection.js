define([
    'backbone', 'models/questionModel'
], function(
    Backbone, QuestionModel
) {
    var QuestionCollection = Backbone.Collection.extend({

        model: QuestionModel,

        url: '/api/questions/',

        parse: function(response) {
            return response.content;
        },

    });

    return QuestionCollection;
});
