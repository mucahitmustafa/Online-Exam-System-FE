define([
    'collections/pageable', 'properties', 'models/questionModel'
], function(PageableCollection, Properties, QuestionModel) {
    var QuestionsPageableCollection = PageableCollection.extend({
        model: QuestionModel,
        url: Properties.APIAddress + "/questions/"

    });
    return QuestionsPageableCollection;
});
