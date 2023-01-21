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
            "click #btn-studentLogin": "loginStudent",
            "click #btn-studentRegister": "registerStudent"

        },

        initialize: function (options) {
            this.template = _.template(StudentLoginTemplate);
            return this;
        },

        render: function () {
            this.$el.html(this.template());

            $('#alert-studentLoginError').hide();
            $('#alert-studentRegisterResponse').hide();
            $('#alert-studentRegisterError').hide();
            $('#alert-studentAlreadyExistError').hide();

            return this;
        },

        loginStudent: function(e) {
            e.preventDefault();
            $('#alert-studentLoginError').hide();
            var mail = $('#txt-mail').val();
            var password = $('#txt-pass').val();

            if (mail.trim().length == 0 || password.trim().length == 0) {
                $('#alert-studentLoginError').show();
                return;
            }

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
        },

        registerStudent: function(e) {
            e.preventDefault();
            $('#alert-studentRegisterResponse').hide();
            $('#alert-studentRegisterError').hide();
            $('#alert-studentAlreadyExistError').hide();

            var foundationCode = $('#txt-register-foundationCode').val();
            var number = $('#txt-register-number').val();
            var name = $('#txt-register-name').val();
            var mail = $('#txt-register-mail').val();
            var password = $('#txt-register-pass').val();

            if (foundationCode.trim().length == 0 || number.trim().length == 0 || name.trim().length == 0 || mail.trim().length == 0 || password.trim().length == 0) {
                $('#alert-studentRegisterError').show();
                return;
            }

            fetch(Properties.APIAddress + '/students/register/' + foundationCode, {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({'number': number, 'name': name, 'mail': mail, 'password': password})
            }).then(function(response) {
                if (response.status != 200) {
                    $('#alert-studentAlreadyExistError').show();
                } else {
                    $('#alert-studentRegisterResponse').show();
                    $('#txt-register-foundationCode').val('');
                    $('#txt-register-number').val('');
                    $('#txt-register-name').val('');
                    $('#txt-register-mail').val('');
                    $('#txt-register-pass').val('');
                }
            })
        }
    });

    return StudentLoginView;
});
