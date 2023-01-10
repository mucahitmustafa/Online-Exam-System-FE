define([
    './baseModel', 'properties'
], function(
    BaseModel, Properties
) {
    var FoundationModel = BaseModel.extend({

        urlRoot: Properties.APIAddress + '/foundations/',
        set: function(key, val, options) {
             return Backbone.Model.prototype.set.apply(this, [key, val, options]);
        },

        validate: function(attributes, options) {
            var errors = [];

            return errors.length > 0 ? errors : options.validate = false;
        },

        defaults: function() {
            return {
            };
        }

    });

    return FoundationModel;
});
