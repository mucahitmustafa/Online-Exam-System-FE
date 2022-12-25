define([
    'collections/pageable', 'models/studentGroupModel'
], function(PageableCollection, StudentGroupModel) {
    var StudentGroupsPageableCollection = PageableCollection.extend({
        model: StudentGroupModel,
        url: "/api/studentGroups"

    });
    return StudentGroupsPageableCollection;
});
