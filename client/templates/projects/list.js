Template.projects.helpers({
    'projects': function () {
        return Projects.find();
    },
    'orders': function () {
        return Orders.find();
    },
    'lawyers': function () {
        return Meteor.users.find({type: 'lawyer'});
    },
    'clients': function () {
        return Meteor.users.find({type: 'client'});
    },
    'courts': function () {
        return Courts.find();
    },
    'labels': function () {
        return Labels.find();
    },
    'types': function () {
        return projectSchema._schema.type.allowedValues;
    },
    'clearFilterVisible': function (event, template) {
        return Session.get("lawyerVal") || Session.get("clientVal") || Session.get("labelVal") ||
                Session.get("courtVal") || Session.get("typeVal");
    }
});

Template.projects.events({
    'change #lawyer-select': function (e) {
        Session.set("lawyerVal", $(e.target).val()?true:false);
        EasySearch.changeProperty('projects', 'lawyers', $(e.target).val());
        EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
    },
    'change #client-select': function (e) {
        Session.set("clientVal", $(e.target).val()?true:false);
        EasySearch.changeProperty('projects', 'clients', $(e.target).val());
        EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
    },
    'change #court-select': function (e, template) {
        var value = $(e.target).val();
        if (value == "")
            $(template.find("#court-select")).multipleSelect('uncheckAll');
        Session.set("courtVal", $(e.target).val()?true:false);
        EasySearch.changeProperty('projects', 'courtId', value ? value[0] : false);
        EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
    },
    'change #type-select': function (e, template) {
        var value = $(e.target).val();
        if (value == "")
            $(template.find("#type-select")).multipleSelect('uncheckAll');
        Session.set("typeVal", $(e.target).val()?true:false);
        EasySearch.changeProperty('projects', 'type', value ? value[0] : false);
        EasySearch.getComponentInstance({index: 'projects'}).triggerSearch  ();
    },
    'change #label-select': function (e) {
        Session.set("labelVal", $(e.target).val()?true:false);
        EasySearch.changeProperty('projects', 'labels', $(e.target).val());
        EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
    },
    'click .clear-all-filter': function (event, template) {
        $(template.findAll('select')).multipleSelect('uncheckAll');
    }
})
Template.projects.rendered = function () {
    EasySearch.changeProperty('projects', 'lawyers', false);
    EasySearch.changeProperty('projects', 'clients', false);
    EasySearch.changeProperty('projects', 'courtId', false);
    EasySearch.changeProperty('projects', 'type', false);
    EasySearch.changeProperty('projects', 'labels', false);
    EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
    $(this.find('#lawyer-select')).multipleSelect({
        filter: true,
        placeholder: 'Select Lawyers'
    });
    $(this.find('#client-select')).multipleSelect({
        filter: true,
        placeholder: 'Select Clients'
    });
    $(this.find('#type-select')).multipleSelect({
        filter: true,
        single: true,
        placeholder: 'Select Type'
    });
    $(this.find('#court-select')).multipleSelect({
        filter: true,
        single: true,
        placeholder: 'Select Court'
    });
    $(this.find('#label-select')).multipleSelect({
        filter: true,
        placeholder: 'Select Labels'
    });
}