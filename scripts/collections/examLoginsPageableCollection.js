define([
    'collections/pageable', 'models/examLoginModel'
], function(PageableCollection, ExamLoginModel) {
    var ExamLoginsPageableCollection = PageableCollection.extend({
        model: ExamLoginModel,
        url: "/api/examLogins"

    });
    return ExamLoginsPageableCollection;
});
