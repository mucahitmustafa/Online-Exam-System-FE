define([
    'jquery',
    'underscore',
    'backbone',
    'text!./login.html',
    'models/foundationModel',
    '../detail/detail'
],
function($, _, Backbone, FoundationLoginTemplate, FoundationModel, FoundationDetailView) {

    var FoundationLoginView = Backbone.View.extend({

        el: '.container',
        events: {
            "click #btn-apiKey": "loginFoundation"

        },

        initialize: function () {
            return this;
        },

        render: function () {
            this.$el.html(_.template(FoundationLoginTemplate, {} ));
            $('#alert-foundationLoginError').hide();
            return this;
        },

        loginFoundation: function(e) {
            $('#alert-foundationLoginError').hide();
            var apiKey = $('#txt-apiKey').val();
            var foundationModel = new FoundationModel();

            var onSuccessHandler = function(collection, response, options) {
                new FoundationDetailView({model: foundationModel, apiKey: apiKey}).render();
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
