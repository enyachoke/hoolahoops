Template.projects.helpers({
    'projects': function() {
      return Projects.find();
    },
    'lawyers': function(){
    	return Lawyers.find();
    },
    'clients': function(){
    	return Clients.find();
    },
    'courts': function(){
    	return Courts.find();
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
      	EasySearch.changeProperty('projects', 'courtId', $(e.target).val());
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	},
	'change #type-select': function(e){
      	EasySearch.changeProperty('projects', 'type', $(e.target).val());
      	EasySearch.getComponentInstance({index: 'projects'}).triggerSearch();
	}
})