define([
    'collections/pageable', 'properties', 'models/studentGroupModel'
], function(PageableCollection, Properties, StudentGroupModel) {
    var StudentGroupsPageableCollection = PageableCollection.extend({
        model: StudentGroupModel,
        url: Properties.APIAddress + "/studentGroups/"

    });
    return StudentGroupsPageableCollection;
});
