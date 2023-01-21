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
            return this;
        },

        saveStudent: function(e) {
            var number = $('#txt-number').val();
            var name = $('#txt-name').val();
            var mail = $('#txt-mail').val();
            var password = $('#txt-pass').val();

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
            e.preventDefault();
            e.preventDefault();
        },

        backToHome: function(e) {
            Backbone.history.navigate('#foundation/detail', {trigger: true});
            if (e) e.preventDefault();
        }
    });

    return StudentAddView;
});
