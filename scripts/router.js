define([
    'backbone',
    'views/student/login/login',
    'views/foundation/login/login'
],
function(
    Backbone,
    StudentLoginView,
    FoundationLoginView
    ) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '':'studentLogin',
            'student' : 'studentLogin',
            'management' : 'foundationLogin',
            '*actions': 'studentLogin'
        }
    });

    var initialize = function () {

        var appRouter = new AppRouter();

        appRouter.on('route:studentLogin', function () {
            var studentLoginView = new StudentLoginView();
            studentLoginView.render();
        });

        appRouter.on('route:foundationLogin', function () {
            var foundationLoginView = new FoundationLoginView();
            foundationLoginView.render();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});
