Router.route('/calendar',{
		name : 'calendar',
    	waitOn: function() {
    		return Meteor.subscribe('hearings');
   	 	},
		data: function (){ return Hearings.find();}
});

Router.route('/projects', {
  name: 'projects',
  waitOn: function () {
    return Meteor.subscribe('projects');
  },
  data: function() {
    return Projects.find();
  }
});

Router.route('/projects/add', {
  name: 'projectAdd'
})

Router.route('/projects/:_id', {
  name: 'projectDetails',
  waitOn: function() {
    return [Meteor.subscribe('projects'), Meteor.subscribe('hearings')];
  },
  data: function () { return {'project':Projects.findOne(this.params._id), 'hearings':Hearings.find({'caseId' : this.params._id})} }
});

Router.route('/projects/:_id/edit', {
  name: 'projectEdit',
  waitOn: function() {
    return Meteor.subscribe('projects');
  },
  data: function () { return Projects.findOne(this.params._id);  }
});


//hearings
Router.route('/hearings', {
  name: 'hearings',
	waitOn: function() {
		return Meteor.subscribe('hearings');
	},
	data: function() {return Hearings.find();}
	
});

Router.route('/hearings/add', {
  name: 'hearingAdd'
})

Router.route('/hearings/:_id', {
  name: 'hearingDetails',
  data: function () { return Hearings.findOne(this.params._id); }
});

Router.route('/hearings/:_id/edit', {
  name: 'hearingEdit',
  data: function () { return Hearings.findOne(this.params._id); }
});