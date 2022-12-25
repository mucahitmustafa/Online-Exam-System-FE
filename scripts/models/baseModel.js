define([
    'backbone'
], function(
    Backbone
) {
    var BaseModel = Backbone.Model.extend({

        set: function(key, val, options) {
            if (val && val.trim) {
                val = val.trim();
            }
            return Backbone.Model.prototype.set.apply(this, [key, val, options]);
        }
    });

    return BaseModel;
});
