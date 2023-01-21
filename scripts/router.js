define([
    'backbone',
    'models/foundationModel',
    'views/student/login/login',
    'views/foundation/login/login',
    'views/foundation/detail/detail',
    'views/foundation/detail/students/add/add',
    'views/foundation/detail/exams/add/add',
    'views/foundation/detail/students/update/update',
    'views/foundation/detail/exams/update/update',
    'views/foundation/detail/exams/statistics/statistics',
    'views/student/home/home',
    'views/student/exam/exam',
    'views/foundation/detail/examLogins/detail/detail',
    'views/student/takenExams/detail/detail'
],
function(
    Backbone,
    FoundationModel,
    StudentLoginView,
    FoundationLoginView,
    FoundationDetailView,
    AddStudentView,
    AddExamView,
    EditStudentView,
    EditExamView,
    ExamStatisticsView,
    StudentHomeView,
    StudentExamView,
    FoundationExamLoginDetail,
    StudentExamDetailView
    ) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '':'studentLogin',
            'student' : 'studentLogin',
            'management' : 'foundationLogin',
            'foundation/detail': 'foundationDetail',
            'foundation/addStudent': 'addStudent',
            'foundation/addExam': 'addExam',
            'foundation/editStudent/:studentId': 'editStudent',
            'foundation/editExam/:examId': 'editExam',
            'foundation/examStatistics/:examId': 'examStatistics',
            'foundation/examLoginDetail/:examLoginId': 'foundationExamLoginDetail',
            'student/:id/exam/:examId': 'studentExam',
            'student/:id/examDetail/:examLoginId': 'studentExamDetail',
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

        appRouter.on('route:foundationDetail', function () {
            var foundationModel = new FoundationModel();
            var apiKey = document.cookie;

            var onSuccessHandler = function(collection, response, options) {
                var foundationDetailView = new FoundationDetailView({model: collection.attributes, apiKey: apiKey});
                foundationDetailView.render();
            };
          
            var onErrorHandler = function(collection, response, options) {
                $('#alert-foundationLoginError').show();
            };

            foundationModel.fetch({
                async: false,
                headers: {'api-key': apiKey},
                error: onErrorHandler,
                success: onSuccessHandler
            })
        });

        appRouter.on('route:addStudent', function () {
            var addStudentExam = new AddStudentView({apiKey: document.cookie});
            addStudentExam.render();
        });

        appRouter.on('route:addExam', function () {
            var addExamView = new AddExamView({apiKey: document.cookie});
            addExamView.render();
        });

        appRouter.on('route:editStudent', function (studentId) {
            var editStudentView = new EditStudentView({apiKey: document.cookie, id: studentId});
            editStudentView.render();
        });

        appRouter.on('route:editExam', function (examId) {
            var editExamView = new EditExamView({apiKey: document.cookie, id: examId});
            editExamView.render();
        });

        appRouter.on('route:examStatistics', function (examId) {
            var examStatisticsView = new ExamStatisticsView({apiKey: document.cookie, examId: examId});
            examStatisticsView.render();
        });
        
        appRouter.on('route:foundationExamLoginDetail', function (examLoginId) {
            var foundationExamLoginDetail = new FoundationExamLoginDetail({apiKey: document.cookie, examLoginId: examLoginId});
            foundationExamLoginDetail.render();
        });

        appRouter.on('route:studentExam', function (id, examId) {
            var editExamView = new StudentExamView({id: id, examId: examId});
            editExamView.render();
        });

        appRouter.on('route:studentExamDetail', function (id, examLoginId) {
            var studentExamDetailView = new StudentExamDetailView({apiKey: document.cookie, studentId: id, examLoginId: examLoginId});
            studentExamDetailView.render();
        });

        appRouter.on('route:studentHome', function (id) {
            var studentHomeView = new StudentHomeView({id: id});
            studentHomeView.render();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});
