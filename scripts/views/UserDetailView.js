var UserDetailView = Backbone.View.extend({

    id: undefined,
    model: undefined,

    initialize: function (props) {
        this.template = _.template($("#dtl-template").html());
        this.parent = props.parent;
        this.id = props.id;
    },

    events: {
    },

    render: function () {
        this.$el.html(this.template());
        fetch('https://reqres.in/api/users/' + this.id)
            .then(response => response.json())
            .then(json => {

                var uv = new UserView({ model: json.data, parent: this.$el });
                this.$el.append(uv.render().$el);
            })
        return this;
    }
});
