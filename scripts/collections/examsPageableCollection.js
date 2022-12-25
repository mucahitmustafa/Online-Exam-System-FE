define([
    'collections/pageable', 'models/examModel'
], function(PageableCollection, ExamModel) {
    var ExamsPageableCollection = PageableCollection.extend({
        model: ExamModel,
        url: "/api/exams"

    });
    return ExamsPageableCollection;
});
