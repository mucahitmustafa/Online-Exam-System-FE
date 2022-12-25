var SearchView = Backbone.View.extend({

    initialize: function (props) {
        this.template = _.template($("#search-template").html());
        this.parent = props.parent;
    },

    events: {
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    }
});
