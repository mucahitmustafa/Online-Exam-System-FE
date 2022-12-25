define([
    'backbone', 'models/studentGroupModel'
], function(
    Backbone, StudentGroupModel
) {
    var StudentGroupCollection = Backbone.Collection.extend({

        model: StudentGroupModel,

        url: '/api/studentGroups/',

        parse: function(response) {
            return response.content;
        },

    });

    return StudentGroupCollection;
});