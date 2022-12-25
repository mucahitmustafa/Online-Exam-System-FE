define([
    'jquery',
    'underscore',
    'backbone',
    'views/exam/add',
    'views/exam/detail',
    'views/exam/exam',
    'views/exam/list',
    'views/exam/update',
    'views/student/add',
    'views/student/detail',
    'views/student/list',
    'views/student/login',
    'views/student/update',
    'views/studentGroup/add',
    'views/studentGroup/detail',
    'views/studentGroup/list',
    'views/studentGroup/update',
    'views/question/add',
    'views/question/detail',
    'views/question/list',
    'views/question/update',
    'views/foundation/detail',
    'views/foundation/login',
    'views/foundation/update',
    'views/examLogin/detail',
    'views/examLogin/list'
],
function(
    $,
    _,
    Backbone,
    ExamAddView,
    ExamDetailView,
    ExamView,
    ExamListView,
    ExamUpdateView,
    StudentAddView,
    StudentDetailView,
    StudentListView,
    StudentLoginView,
    StudentUpdateView,
    StudentGroupAddView,
    StudentGroupDetailView,
    StudentGroupListView,
    StudentGroupUpdateView,
    QuestionAddView,
    QuestionDetailView,
    QuestionListView,
    QuestionUpdateView,
    FoundationDetailView,
    FoundationLoginView,
    FoundationUpdateView,
    ExamLoginDetailView,
    ExamLoginListView
    ) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            '':'studentLogin',
            'foundationLogin' : 'foundationLogin',
            'foundation' : 'foundationDetail',
            'foundationUpdate' : 'foundationUpdate',
            'studentAdd' : 'studentAdd',
            'studentDetail' : 'studentDetail',
            'studentUpdate' : 'studentUpdate',
            'studentList' : 'studentList',
            'studentGroupAdd' : 'studentGroupAdd',
            'studentGroupDetail' : 'studentGroupDetail',
            'studentGroupUpdate' : 'studentGroupUpdate',
            'studentGroupList' : 'studentGroupList',
            'examAdd' : 'examAdd',
            'examDetail' : 'examDetail',
            'examUpdate' : 'examUpdate',
            'examList' : 'examList',
            'questionAdd' : 'questionAdd',
            'questionDetail' : 'questionDetail',
            'questionUpdate' : 'questionUpdate',
            'questionList' : 'questionList',
            'examLoginDetail' : 'examLoginDetail',
            'examLoginList' : 'examLoginList',
            'exam': 'exam',
            '*actions': 'studentLogin'
        }
    });

    var initialize = function () {

        var appRouter = new AppRouter();

        appRouter.on('route:studentLogin', function () {
            console.log("Router --> studentLogin");
            new StudentLoginView();
        });

        appRouter.on('route:foundationLogin', function () {
            console.log("Router --> foundationLogin");
            new FoundationLoginView();
        });

        appRouter.on('route:foundationDetail', function () {
            console.log("Router --> foundationDetail");
            new FoundationDetailView();
        });

        appRouter.on('route:foundationUpdate', function () {
            console.log("Router --> foundationUpdate");
            new FoundationUpdateView();
        });

        appRouter.on('route:studentAdd', function () {
            console.log("Router --> studentAdd");
            new StudentAddView();
        });

        appRouter.on('route:studentDetail', function () {
            console.log("Router --> studentDetail");
            new StudentDetailView();
        });

        appRouter.on('route:studentUpdate', function () {
            console.log("Router --> studentUpdate");
            new StudentUpdateView();
        });

        appRouter.on('route:studentList', function () {
            console.log("Router --> studentList");
            new StudentListView();
        });

        appRouter.on('route:studentGroupAdd', function () {
            console.log("Router --> studentGroupAdd");
            new StudentGroupAddView();
        });

        appRouter.on('route:studentGroupDetail', function () {
            console.log("Router --> studentGroupDetail");
            new StudentGroupDetailView();
        });

        appRouter.on('route:studentGroupUpdate', function () {
            console.log("Router --> studentGroupUpdate");
            new StudentGroupUpdateView();
        });

        appRouter.on('route:studentGroupList', function () {
            console.log("Router --> studentGroupList");
            new StudentGroupListView();
        });

        appRouter.on('route:examAdd', function () {
            console.log("Router --> examAdd");
            new ExamAddView();
        });

        appRouter.on('route:examDetail', function () {
            console.log("Router --> examDetail");
            new ExamDetailView();
        });

        appRouter.on('route:examUpdate', function () {
            console.log("Router --> examUpdate");
            new ExamUpdateView();
        });

        appRouter.on('route:examList', function () {
            console.log("Router --> examList");
            new ExamListView();
        });

        appRouter.on('route:questionAdd', function () {
            console.log("Router --> questionAdd");
            new QuestionAddView();
        });

        appRouter.on('route:questionDetail', function () {
            console.log("Router --> questionDetail");
            new QuestionDetailView();
        });

        appRouter.on('route:questionUpdate', function () {
            console.log("Router --> questionUpdate");
            new QuestionUpdateView();
        });

        appRouter.on('route:questionList', function () {
            console.log("Router --> questionList");
            new QuestionListView();
        });

        appRouter.on('route:examLoginDetail', function () {
            console.log("Router --> examLoginDetail");
            new ExamLoginDetailView();
        });

        appRouter.on('route:examLoginList', function () {
            console.log("Router --> examLoginList");
            new ExamLoginListView();
        });

        appRouter.on('route:exam', function () {
            console.log("Router --> exam");
            new ExamView();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };

});
