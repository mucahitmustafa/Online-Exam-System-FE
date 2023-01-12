define([
    'jquery',
    'underscore',
    'backbone',
    'text!./login.html',
    'properties'
],
function($, _, Backbone, StudentLoginTemplate, Properties) {

    var StudentLoginView = Backbone.View.extend({

        el: '.container',
        events: {
            "click #btn-studentLogin": "loginStudent"

        },

        initialize: function (options) {
            this.template = _.template(StudentLoginTemplate);
            return this;
        },

        render: function () {
            this.$el.html(this.template());

            $('#alert-studentLoginError').hide();
            return this;
        },

        loginStudent: function(e) {
            $('#alert-studentLoginError').hide();
            var mail = $('#txt-mail').val();
            var password = $('#txt-pass').val();

            fetch(Properties.APIAddress + '/students/login', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({'mail': mail, 'password': password})
            }).then(response => response.json()).then(function(response) {
                if (response.error) {
                    $('#alert-studentLoginError').show();
                } else {
                    Backbone.history.navigate('#student/' + response.id, {trigger: true});
                }
            })
        
        }

    });

    return StudentLoginView;
});
