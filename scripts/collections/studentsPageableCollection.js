define([
    'collections/pageable', 'models/studentModel'
], function(PageableCollection, StudentModel) {
    var StudentsPageableCollection = PageableCollection.extend({
        model: StudentModel,
        url: "/api/students"

    });
    return StudentsPageableCollection;
});
