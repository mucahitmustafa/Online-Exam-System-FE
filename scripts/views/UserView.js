var UserView = Backbone.View.extend({
    model: undefined,
    tagName: "li",
    parent: undefined,

    initialize: function (props) {
        this.template = _.template($("#item-template").html());
        this.parent = props.parent;
    },

    render: function () {
        this.$el.html(this.template(this.model));
        return this;
    }
});
