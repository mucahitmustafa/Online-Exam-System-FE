define([
    'backbone', 'properties', 'models/studentGroupModel'
], function(
    Backbone, Properties, StudentGroupModel
) {
    var StudentGroupCollection = Backbone.Collection.extend({

        model: StudentGroupModel,

        url: Properties.APIAddress + '/studentGroups/',

        parse: function(response) {
            return response.content;
        },

    });

    return StudentGroupCollection;
});