define([
    'jquery',
    'underscore',
    'backbone',
    'text!./login.html',
    'properties',
    '../home/home'
],
function($, _, Backbone, StudentLoginTemplate, Properties, StudentHomeView) {

    var StudentLoginView = Backbone.View.extend({

        el: '.container',
        events: {
            "click #btn-studentLogin": "loginStudent"

        },

        initialize: function () {
            console.log("StudentLoginView is being initialized...");
            this.render();
        },

        render: function () {
            this.$el.html(_.template(StudentLoginTemplate, {} ));
        },

        loginStudent: function(e) {
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
                    alert("Wrong username or password!");
                } else {
                    new StudentHomeView({model: response});
                }
            })
        
        }

    });

    return StudentLoginView;
});
