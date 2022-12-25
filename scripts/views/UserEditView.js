var UserEditView = Backbone.View.extend({

    id: undefined,
    model: undefined,

    initialize: function (props) {
        this.template = _.template($("#edit-template").html());
        this.parent = props.parent;
        this.id = props.id;
    },

    events: {
        "click #save-btn": "saveUser",
        "click #show-btn": "showUser"
    },

    saveUser: function (event) {
        fetch('https://reqres.in/api/users/' + this.id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: $("#first_name").val(),
                last_name: $("#last_name").val(),
                email: $("email").val(),
                id: $("#id").val()
            })
        }).then(response => alert("Changes are saved..."))
    },

    showUser: function (evt) {
        var view = new UserDetailView({ el: "#container", id: this.id })
        view.render();
    },

    render: function () {
        this.$el.html(this.template(this.model));
        return this;
    },

    userEdit: function (event) {

    }
});
