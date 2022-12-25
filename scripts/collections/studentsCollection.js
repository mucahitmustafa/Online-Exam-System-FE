define([
    'backbone', 'models/studentModel'
], function(
    Backbone, StudentModel
) {
    var StudentCollection = Backbone.Collection.extend({

        model: StudentModel,

        url: '/api/students/',

        parse: function(response) {
            return response.content;
        },

    });

    return StudentCollection;
});