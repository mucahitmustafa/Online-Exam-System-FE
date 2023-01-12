define([
    'jquery',
    'underscore',
    'backbone',
    'properties',
    'text!./update.html',
    '../detail'
],
function($, _, Backbone, Properties, StudentUpdateTemplate, StudentsPanelView) {

    var StudentUpdateView = Backbone.View.extend({

        el: '.container',
        apiKey: undefined,
        model: undefined,
        events: {
            "click #btn-saveStudent": "saveStudent",
            "click #btn-backToHome": "backToHome",
        },

        initialize: function (options) {
            this.template = _.template(StudentUpdateTemplate);
            this.apiKey = options.apiKey;
            this.foundationModel = options.foundationModel;
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model));
            return this;
        },

        saveStudent: function(e) {
            var number = $('#txt-number').val();
            var name = $('#txt-name').val();
            var mail = $('#txt-mail').val();
            var password = $('#txt-pass').val();

            var self = this;
            fetch(Properties.APIAddress + '/students/' + this.model.id, {
                async: false,
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'api-key': this.apiKey
                },
                body: JSON.stringify({'number': number, 'name': name, 'mail': mail, 'password': password})
            }).then(self.backToHome());
        },

        backToHome: function(e) {
            var studentsPanelView = new StudentsPanelView({apiKey: this.apiKey, model: this.foundationModel});
            $('.panel-students').append(studentsPanelView.render().$el);
        }
    });

    return StudentUpdateView;
});
