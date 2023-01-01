define([
    'backbone', 'properties', 'models/studentModel'
], function(
    Backbone, Properties, StudentModel
) {
    var StudentCollection = Backbone.Collection.extend({

        model: StudentModel,

        url: Properties.APIAddress + '/students/',

        parse: function(response) {
            return response.content;
        },

    });

    return StudentCollection;
});