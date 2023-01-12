define([
    'jquery',
    'underscore',
    'backbone',
    'text!./login.html',
    'models/foundationModel'
],
function($, _, Backbone, FoundationLoginTemplate, FoundationModel) {

    var FoundationLoginView = Backbone.View.extend({

        el: '.container',
        events: {
            "click #btn-apiKey": "loginFoundation"

        },

        initialize: function () {
            this.template = _.template(FoundationLoginTemplate);

            return this;
        },

        render: function () {
            this.$el.html(this.template());
            $('#alert-foundationLoginError').hide();
            return this;
        },

        loginFoundation: function(e) {
            $('#alert-foundationLoginError').hide();
            var apiKey = $('#txt-apiKey').val();
            var foundationModel = new FoundationModel();

            var onSuccessHandler = function(collection, response, options) {
                Backbone.history.navigate('#foundation/' + apiKey);
            };
          
            var onErrorHandler = function(collection, response, options) {
                $('#alert-foundationLoginError').show();
            };

            foundationModel.fetch({
                async: false,
                headers: {'api-key': apiKey},
                error: onErrorHandler,
                success: onSuccessHandler
            })
        }

    });

    return FoundationLoginView;
});
