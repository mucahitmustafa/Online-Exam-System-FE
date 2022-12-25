var UserAddView = Backbone.View.extend({

    initialize: function (props) {
        this.template = _.template($("#add-template").html());
        this.parent = props.parent;
    },

    events: {
        "click #add-btn": "addUser"
    },

    addUser: function (event) {
        fetch('https://reqres.in/api/users', {
            method: 'POST',
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
        }).then(response => alert("New user added..."))
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    }
})
