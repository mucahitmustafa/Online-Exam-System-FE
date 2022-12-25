var UserListView = Backbone.View.extend({
    model: undefined,
    el: $(".userlist"),

    initialize: function () {
    },

    events: {
        "click #delete-btn": "deleteUser",
        "click #detail-btn": "showDetail",
        "click #edit-btn": "editUser",
        "click #find-btn": "findUser"
    },

    findUser: function (evt) {
        var first_name = $("#s_first_name").val()
        this.$el.html("User List View");
        var sv = new SearchView({ parent: this.$el });
        this.$el.append(sv.render().$el);


        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(json => {
                var foundUsers = json.data.filter(element => element.first_name.toUpperCase().includes(first_name.toUpperCase()))
                foundUsers.map(foundUser => {
                    var uv = new UserView({ model: foundUser, parent: this.$el });
                    this.$el.append(uv.render().$el);
                })
            })
    },


    editUser: function (evt) {
        fetch('https://reqres.in/api/users/' + evt.target.className)
            .then(response => response.json())
            .then(json => {
                var view = new UserEditView({ el: "#template-body", id: evt.target.className, model: json.data })
                view.render();
            })
    },

    showDetail: function (evt) {
        var view = new UserDetailView({ el: "#contatemplate-bodyiner", id: evt.target.className })
        view.render();
    },

    deleteUser: function (evt) {
        return fetch('https://reqres.in/api/users' + '/' + evt.target.className, {
            method: 'DELETE'
        })
            .then(response => alert("Person no: " + evt.target.className + " is deleted..."));
    },

    render: function () {
        this.$el.html("User List View");

        var sv = new SearchView({ parent: this.$el });
        this.$el.append(sv.render().$el);

        fetch('https://reqres.in/api/users')
            .then(response => response.json())
            .then(json => {
                const markup = json.data.map(el => {

                    var uv = new UserView({ model: el, parent: this.$el });
                    this.$el.append(uv.render().$el);

                });
                document.querySelector('.list-container').innerHTML = markup.join(''); //to remove comma

            })


        return this;
    }
});

