Template.projects.helpers({
    'projects': function() {
      return Projects.find();
    },
    'orders': function() {
      return Orders.find();
    },
    'lawyers': function(){
    	return Meteor.users.find({type : 'lawyer'});
    },
    'clients': function(){
    	return Meteor.users.find({type : 'client'});
    },
    'courts': function(){
    	return Courts.find();
    },
    'labels': function(){
      return Labels.find();
    },
    'types': function(){
    	return projectSchema._schema.type.allowedValues;
    }
});

Template.projects.events({
	'change #lawyer-select': function(e){
      	EasySearch.changeProperty('projects', 'lawyers', $(e.target).val());
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	},
	'change #client-select': function(e){
      	EasySearch.changeProperty('projects', 'clients', $(e.target).val());
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	},
	'change #court-select': function(e, template){
        var value = $(e.target).val();
        if(value=="")
          $(template.find("#court-select")).multipleSelect('uncheckAll');
      	EasySearch.changeProperty('projects', 'courtId', value?value[0]:false);
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	},
	'change #type-select': function(e, template){
        var value = $(e.target).val();
        if(value)
          $(template.find("#type-select")).multipleSelect('uncheckAll');
      	EasySearch.changeProperty('projects', 'type', value?value[0]:false);
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	},
  'change #label-select': function(e){
        EasySearch.changeProperty('projects', 'labels', $(e.target).val());
        EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
  }
})

Template.projects.rendered = function(){
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