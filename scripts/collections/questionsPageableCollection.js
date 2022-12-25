define([
    'collections/pageable', 'models/questionModel'
], function(PageableCollection, QuestionModel) {
    var QuestionsPageableCollection = PageableCollection.extend({
        model: QuestionModel,
        url: "/api/questions"

    });
    return QuestionsPageableCollection;
});
