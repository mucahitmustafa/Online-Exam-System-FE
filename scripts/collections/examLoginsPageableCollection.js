define([
    'collections/pageable', 'properties', 'models/examLoginModel'
], function(PageableCollection, Properties, ExamLoginModel) {
    var ExamLoginsPageableCollection = PageableCollection.extend({
        model: ExamLoginModel,
        url: Properties.APIAddress + "/examLogins/"

    });
    return ExamLoginsPageableCollection;
});
