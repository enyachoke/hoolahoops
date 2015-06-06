var infiScrollLock = false;

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

Template.projects.rendered = function() {
    Session.setDefault('limit', testLimit);
    var instance = EasySearch.getComponentInstance(
       { id : 'search', index : 'projects' }
      );
      console.log(Session.get('limit'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      EasySearch.changeLimit('projects', Session.get('limit'));
      instance.paginate(1);
      instance.triggerSearch();
};


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
	},
  'click .loadmore' : function(e){

    var instance = EasySearch.getComponentInstance(
       { id : 'search', index : 'projects' }
      );
    incrementLimit();
      //instance.currentLimit(20);
    //  EasySearch.changeProperty('projects', 'filteredCategory', $(e.target).val());
      console.log(Session.get('limit'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      EasySearch.changeLimit('projects', Session.get('limit'));
      instance.paginate(1);
      instance.triggerSearch();
  }
})

$(document).on("scroll", function (e) {
  if ($(document).height() - $(document).scrollTop() - $(window).height() < 50 && !infiScrollLock){
    infiScrollLock = true;
    var instance = EasySearch.getComponentInstance(
       { id : 'search', index : 'projects' }
      );
    incrementLimit();
      //instance.currentLimit(20);
    //  EasySearch.changeProperty('projects', 'filteredCategory', $(e.target).val());
      console.log(Session.get('limit'));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      EasySearch.changeLimit('projects', Session.get('limit'));
      instance.paginate(1);
      instance.triggerSearch();
      infiScrollLock = false;
  }
})