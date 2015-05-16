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
	'change #court-select': function(e){
        if($(e.target).val()=="")
          $("#court-select").multipleSelect('uncheckAll');
      	EasySearch.changeProperty('projects', 'courtId', $(e.target).val()?$(e.target).val()[0]:false);
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	},
	'change #type-select': function(e){
        if($(e.target).val()=="")
          $("#type-select").multipleSelect('uncheckAll');
      	EasySearch.changeProperty('projects', 'type', $(e.target).val()?$(e.target).val()[0]:false);
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	},
  'change #label-select': function(e){
        EasySearch.changeProperty('projects', 'labels', $(e.target).val());
        EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
  }
})