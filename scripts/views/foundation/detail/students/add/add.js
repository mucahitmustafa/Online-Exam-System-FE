define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./add.html'
],
function($, _, Backbone, Properties, StudentAddTemplate) {

    var StudentAddView = Backbone.View.extend({

        el: '.container',
        events: {
            "click #btn-saveStudent": "saveStudent",
            "click #btn-backToHome": "backToHome",
        },

        initialize: function (options) {
            this.template = _.template(StudentAddTemplate);
            this.apiKey = options.apiKey;
            return this;
        },

        render: function () {
            this.$el.html(this.template());
            $('#alert-fillAlFields').hide();
            return this;
        },

        saveStudent: function(e) {
            e.preventDefault();
            $('#alert-fillAlFields').hide();
            var number = $('#txt-number').val();
            var name = $('#txt-name').val();
            var mail = $('#txt-mail').val();
            var password = $('#txt-pass').val();

            var emptyFields = "";
            if (number.trim().length == 0) {
                emptyFields += "<br>* Number";
            }
            if (name.trim().length == 0) {
                emptyFields += "<br>* Name";
            }
            if (mail.trim().length == 0) {
                emptyFields += "<br>* Mail";
            }
            if (password.trim().length == 0) {
                emptyFields += "<br>* Password";
            }

            if (emptyFields.trim().length > 0) {
                $('#alert-fillAlFields').html('Fill in the following fields:' + emptyFields);
                $('#alert-fillAlFields').show();
                return;
            }

            var self = this;
            fetch(Properties.APIAddress + '/students/', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'number': number, 'name': name, 'mail': mail, 'password': password})
            }).then(self.backToHome());
        },

        backToHome: function(e) {
            this.undelegateEvents();
            if (e) e.preventDefault();
            Backbone.history.navigate('#foundation/detail', {trigger: true, replace: true});
        }
    });

    return StudentAddView;
});
