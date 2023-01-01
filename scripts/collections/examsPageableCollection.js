define([
    'collections/pageable', 'properties', 'models/examModel'
], function(PageableCollection, Properties, ExamModel) {
    var ExamsPageableCollection = PageableCollection.extend({
        model: ExamModel,
        url: Properties.APIAddress + "/exams/"

    });
    return ExamsPageableCollection;
});
