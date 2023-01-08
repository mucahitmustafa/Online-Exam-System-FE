define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./add.html',
    '../detail'
],
function($, _, Backbone, Properties, StudentAddTemplate, StudentsPanelView) {

    var StudentAddView = Backbone.View.extend({

        el: '.container',
        apiKey: undefined,
        events: {
            "click #btn-saveStudent": "saveStudent",
            "click #btn-backStudentPanel": "backStudentPanel",
        },

        initialize: function (options) {
            this.template = _.template(StudentAddTemplate);
            this.apiKey = options.apiKey;
            this.render();
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

            fetch(Properties.APIAddress + '/students/', {
                async: false,
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'number': number, 'name': name, 'mail': mail, 'password': password})
            }).then(this.backStudentPanel());
        },

        backStudentPanel: function(e) {
            var studentsPanelView = new StudentsPanelView({apiKey: this.apiKey});
            $('.panel-students').append(studentsPanelView.render().$el);
        }
    });

    return StudentAddView;
});
