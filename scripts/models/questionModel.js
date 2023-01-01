define([
    './baseModel', 'properties'
], function(
    BaseModel, Properties
) {
    var QuestionModel = BaseModel.extend({

        urlRoot: Properties.APIAddress + '/questions/',
        set: function(key, val, options) {
             return Backbone.Model.prototype.set.apply(this, [key, val, options]);
        },

        validate: function(attributes, options) {
            console.log("[QuestionModel]:: validate -> attributes is %O ", attributes);
            var errors = [];

            return errors.length > 0 ? errors : options.validate = false;
        },

        defaults: function() {
            return {
            };
        }

    });

    return QuestionModel;
});
