define([
    './baseModel'
], function(
    BaseModel
) {
    var StudentGroupModel = BaseModel.extend({

        urlRoot: '/api/studentGroups/',
        set: function(key, val, options) {
             return Backbone.Model.prototype.set.apply(this, [key, val, options]);
        },

        validate: function(attributes, options) {
            console.log("[StudentGroupModel]:: validate -> attributes is %O ", attributes);
            var errors = [];

            return errors.length > 0 ? errors : options.validate = false;
        },

        defaults: function() {
            return {
            };
        }

    });

    return StudentGroupModel;
});
