define([
    'backbone', 'models/examLoginModel'
], function(
    Backbone, ExamLoginModel
) {
    var ExamLoginCollection = Backbone.Collection.extend({

        model: ExamLoginModel,

        url: '/api/examLogins/',

        parse: function(response) {
            return response.content;
        },

    });

    return ExamLoginCollection;
});