define([
    'backbone',
    'views/student/login/login',
    'views/foundation/login/login',
    'views/foundation/detail/students/add/add',
    'views/foundation/detail/exams/add/add',
    'views/foundation/detail/students/update/update',
    'views/foundation/detail/exams/update/update',
    'views/student/home/home',
    'views/student/exam/exam'
],
function(
    Backbone,
    StudentLoginView,
    FoundationLoginView,
    AddStudentView,
    AddExamView,
    EditStudentView,
    EditExamView,
    StudentHomeView,
    StudentExamView
    ) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '':'studentLogin',
            'student' : 'studentLogin',
            'management' : 'foundationLogin',
            'foundation/:apiKey/addStudent': 'addStudent',
            'foundation/:apiKey/addExam': 'addExam',
            'foundation/:apiKey/editStudent/:studentId': 'editStudent',
            'foundation/:apiKey/editExam/:examId': 'editExam',
            'student/:id/exam/:examId': 'studentExam',
            'student/:id': 'studentHome',
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

        appRouter.on('route:addStudent', function (apiKey) {
            var addStudentExam = new AddStudentView({apiKey: apiKey});
            addStudentExam.render();
        });

        appRouter.on('route:addExam', function (apiKey) {
            var addExamView = new AddExamView({apiKey: apiKey});
            addExamView.render();
        });

        appRouter.on('route:editStudent', function (apiKey, studentId) {
            var editStudentView = new EditStudentView({apiKey: apiKey, id: studentId});
            editStudentView.render();
        });

        appRouter.on('route:editExam', function (apiKey, examId) {
            var editExamView = new EditExamView({apiKey: apiKey, id: examId});
            editExamView.render();
        });

        appRouter.on('route:studentHome', function (id) {
            var studentHomeView = new StudentHomeView({id: id});
            studentHomeView.render();
        });

        appRouter.on('route:studentExam', function (id, examId) {
            var editExamView = new StudentExamView({id: id, examId: examId});
            editExamView.render();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});
