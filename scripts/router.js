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
            new StudentLoginView();
        });

        appRouter.on('route:foundationLogin', function () {
            new FoundationLoginView();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});
