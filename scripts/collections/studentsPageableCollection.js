define([
    'collections/pageable', 'properties', 'models/studentModel'
], function(PageableCollection, Properties, StudentModel) {
    var StudentsPageableCollection = PageableCollection.extend({
        model: StudentModel,
        url: Properties.APIAddress + "/students/"

    });
    return StudentsPageableCollection;
});
