Router.route('/clients/add',{
	name : 'addClient'
});

Router.route('/contacts',{
	name : 'clientsList',
	waitOn : function(){
		return Meteor.subscribe('clients');
	}
});

Router.route('/timesheets',{
	name : 'timesheets',
	waitOn : function(){
		return [Meteor.subscribe('timesheets'), Meteor.subscribe('projects')];
	}
});

Router.route('/timesheets/add',{
	name : 'addTimesheet'
});

Router.route('/timesheets/:_id',{
	name : 'timesheetDetail',
	waitOn : function(){
		return Meteor.subscribe('timesheets');
	},
	data : function(){ return Timesheets.find({ _id : this.params._id }); }
});

Router.route('/timesheets/:_id/edit',{
	name : 'editTimesheet',
	waitOn : function(){
		return [ Meteor.subscribe('timesheets'), Meteor.subscribe('projects')];
	},
	data : function(){ return Timesheets.findOne({ _id : this.params._id }); }
});

Router.route('/clients/:_id',{
	name : 'clientDetails',
    waitOn: function () {
      return Meteor.subscribe('clients');
    },
	data: function(){ return Clients.findOne({_id : this.params._id}) }
});

Router.route('/clients/:_id/edit',{
	name : 'editClient',
    waitOn: function () {
      return Meteor.subscribe('clients');
    },
	data: function(){ return Clients.findOne({_id : this.params._id}) }
});

Router.route('/meetings/add',{
	name : 'addMeeting'
});

Router.route('/meetings/:_id',{
	name : 'meetingDetails',
	waitOn: function() {
		return [Meteor.subscribe('hearings'), Meteor.subscribe('events'), Meteor.subscribe('projects'), Meteor.subscribe('tasks'), Meteor.subscribe('meetings')];
 	},
	data: function(){ return Meetings.findOne({ _id : this.params._id });}
});

Router.route('/meetings/:_id/edit',{
	name : 'editMeeting',
	waitOn: function() {
		return [Meteor.subscribe('hearings'), Meteor.subscribe('events'), Meteor.subscribe('projects'), Meteor.subscribe('tasks'), Meteor.subscribe('meetings')];
 	},
	data: function(){ return Meetings.findOne({ _id : this.params._id });}
});

Router.route('/meetings',{
	name : 'meetings',
    waitOn: function () {
      return [Meteor.subscribe('meetings'), Meteor.subscribe('projects')];
    }
});

Router.route('/tasks/add',{
	name : 'addTask'
});

Router.route('/tasks',{
	name : 'tasks',
	waitOn: function() {
		return [Meteor.subscribe('hearings'), Meteor.subscribe('events'), Meteor.subscribe('projects'), Meteor.subscribe('tasks')];
 	},
	data : function() { return Tasks.find(); }
});

Router.route('/tasks/:_id', {
  name: 'taskDetails',
	waitOn: function() {
		return [Meteor.subscribe('hearings'), Meteor.subscribe('projects'), Meteor.subscribe('courts'), Meteor.subscribe('tasks')];
	},
  	data: function () { return Tasks.findOne(this.params._id); }
});

Router.route('/timetracker',{
	name : 'timetracker'
});

Router.route('/calendar',{
		name : 'calendar',
    	waitOn: function() {
    		return [Meteor.subscribe('hearings'), Meteor.subscribe('events'), Meteor.subscribe('projects'), Meteor.subscribe('tasks'), Meteor.subscribe('events1')];
   	 	}
});

Router.route('/projects', {
  name: 'projects',
  waitOn: function () {
    return [Meteor.subscribe('projects'), Meteor.subscribe('clients'), Meteor.subscribe('lawyers')];
  }
});

Router.route('/projects/add', {
  name: 'projectAdd'
})

Router.route('/projects/:_id', {
  name: 'projectDetails',
  waitOn: function() {
    return [Meteor.subscribe('projects'), Meteor.subscribe('hearings'), Meteor.subscribe('courts'), Meteor.subscribe('lawyers'), Meteor.subscribe('clients')];
  },
  data: function () { return Projects.findOne(this.params._id) }
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
		return [Meteor.subscribe('hearings'), Meteor.subscribe('projects'), Meteor.subscribe('courts')];
	},
	data: function() { return Hearings.find(); }
	
});

Router.route('/hearings/add', {
  name: 'hearingAdd'
})

Router.route('/hearings/:_id', {
  name: 'hearingDetails',
	waitOn: function() {
		return [Meteor.subscribe('hearings'), Meteor.subscribe('projects'), Meteor.subscribe('courts'), Meteor.subscribe('lawyers'), Meteor.subscribe('clients')];
	},
  	data: function () { return Hearings.findOne(this.params._id); }
});

Router.route('/hearings/:_id/edit', {
  name: 'hearingEdit',
	waitOn: function() {
		return [Meteor.subscribe('hearings'), Meteor.subscribe('projects'), Meteor.subscribe('courts'), Meteor.subscribe('lawyers')];
	},	
  data: function () { return Hearings.findOne(this.params._id); }
});