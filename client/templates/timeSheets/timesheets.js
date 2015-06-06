var testLimit = 4;
EasySearch.createSearchIndex('projects', {
  'collection': Projects, // instanceof Meteor.Collection
  'field': ['name'], // array of fields to be searchable
  'limit': testLimit,
  'use' : 'mongo-db',
  'props': {
    'filteredCategory': 'All',
    'sortBy': 'name'
  },
  'sort': function() {
    if (this.props.sortBy === 'name') {
      return { 'name': 1 };
    } 

    return { 'name': 1 };
  },
  'query': function(searchString, opts) {
    // Default query that will be used for the mongo-db selector
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

//    console.log(opts);

    // filter for categories if set
    if (this.props.filteredCategory.toLowerCase() !== 'all') {
      query.category = this.props.filteredCategory;
    }

    return query;
  }
});

Template.timesheets.created = function() {
	Session.setDefault('limit', testLimit);
 	Deps.autorun(function(){
		Meteor.subscribe("allusers");
	});
};
Template.projects.rendered = function() {
    Session.setDefault('limit', testLimit);     
    var instance = EasySearch.getComponentInstance(
       { id : 'search', index : 'projects' }
      );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
      EasySearch.changeLimit('projects', Session.get('limit'));
      instance.paginate(1);
      instance.triggerSearch();
};

incrementLimit = function() {
  newLimit = Session.get('limit') + testLimit;
  Session.set('limit', newLimit);
}

Template.timesheets.helpers({
	'timesheets' : function(){
		return Projects.find();
	},
});

Template.timesheets.events({
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
});

Template.timesheetRow.helpers({
	'case' : function(){
		//console.log(this);
		return this.name;
	},
	'totaltime' : function(){
		//Timesheets.find({caseId : this._id});
		var total = 0;
		Timesheets.find({caseId: this._id}).map(function(doc) {
			console.log(doc.duration);
			total += String_to_ms(doc.duration);			
  			//total += doc.duration;
		});

		return formatTime(total);
	}
});

Template.editTimesheet.rendered = function(){
	
}

Template.addTimesheet.helpers({
	'session_time' : function(){
		return Session.get('timeTracked');
	}
});

Template.editTimesheet.helpers({
	'fetch_duration' : function(){
		var ms = String_to_ms(this.duration);
		Session.set('lapTime', ms);
		return Session.get('timeTracked');
	},
	'session_time' : function(){
		return Session.get('timeTracked');
	}
});

Template.timesheetRow.events({
	'click #delete' : function(){
		console.log(this._id);
		Timesheets.find({caseId: this._id}).map(function(doc) {
			Timesheets.remove(doc._id);		
  		});
	}
});			
useremail = {};								
Template.timesheetDetail.helpers({
	'timeloop' : function(){
		var time = {};
		this.map(function(doc){
				if(!time[doc.userId])
					time[doc.userId] = 0;
				time[doc.userId] += String_to_ms(doc.duration);
		});
		var Cases = new Mongo.Collection();
		for(var key in time){
			var email = Meteor.users.find({_id: key}).fetch();
			useremail[key] = email[0].emails[0].address;
  			Cases.insert({
  				user: email[0].emails[0].address,
  				duration: formatTime(time[key])
  			});
		}
		return Cases.find();
	},

	'timesheetloop' : function(){
		return this;
	}
});

Template.timesheetDetailRow.helpers({
	'user' : function(){
		return useremail[this.userId];
	}
});

