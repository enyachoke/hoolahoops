Router.plugin('auth');

Router.configure({
  'loadingTemplate': 'loading'
});

Router.route('/',{
  name: 'home',
  // TODO: Find a better solution for this than redirect
  onBeforeAction: function () {
    Router.go('projects');
  }
});

Router.route('/login', {
  name: 'login'
});

Router.route('/clients/add',{
	name : 'addClient'
});

Router.route('/documents',{
	name: 'docs'
});


Router.route('/googleauth',function(){

	if (this.params.query.code !=undefined ){
		Meteor.call('getGoogleAuthToken',this.params.query.code,function(err,res){console.log('res',res)});	
	}
	this.render('docs');
});

Router.route('/bills',{
	name : 'bills',
	waitOn : function(){
		return [ Meteor.subscribe('lawyers'), Meteor.subscribe('bills'), Meteor.subscribe('projects'), Meteor.subscribe('hearings'), Meteor.subscribe('clients') ];
	}
});

Router.route('/bills/add',{
	name : 'addBill',
});

Router.route('/bills/:_id',{
	name : 'billDetails',
	waitOn : function(){
		return [ Meteor.subscribe('bills'), Meteor.subscribe('projects'), Meteor.subscribe('hearings'), Meteor.subscribe('clients'),Meteor.subscribe('lawyers') ];
	},
	data : function (){
		debugger;
		return Bills.findOne(this.params._id);
	}
});

Router.route('/bills/:_id/edit',{
	name : 'editBill',
	waitOn : function(){
		return [ Meteor.subscribe('bills'), Meteor.subscribe('projects'), Meteor.subscribe('hearings'), Meteor.subscribe('clients') ];
	}
});

Router.route('/lawyers',{
	name : 'lawyers',
	waitOn : function(){
		return Meteor.subscribe('lawyers');
	}
});

Router.route('/lawyers/add',{
	name : 'addLawyer'
});

Router.route('/lawyers/:_id/edit',{
	name : 'editLawyer',
	waitOn : function(){
		return Meteor.subscribe('lawyers');
	},	
  data: function () { return Meteor.users.findOne({ _id : this.params._id}); }
});

Router.route('/lawyers/:_id',{
	name : 'lawyerDetails',
    waitOn: function () {
      return Meteor.subscribe('lawyers');
    },
	data: function(){ return Meteor.users.findOne({_id : this.params._id}) }
});


Router.route('/courts',{
	name : 'courts',
	waitOn : function(){
		return Meteor.subscribe('courts');
	}
});

Router.route('/courts/add',{
	name : 'addCourt'
});

Router.route('/courts/:_id/edit',{
	name : 'editCourt',
	waitOn : function(){
		return Meteor.subscribe('courts');
	},	
  data: function () { return Courts.findOne(this.params._id); }
});





Router.route('/clients',{
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
	data: function(){ return Meteor.users.findOne({_id : this.params._id}) }
});

Router.route('/clients/:_id/edit',{
	name : 'editClient',
    waitOn: function () {
      return Meteor.subscribe('clients');
    },
	data: function(){ return Meteor.users.findOne({_id : this.params._id}) }
});

Router.route('/projects/:_projectId/meetings/add', {
  name: 'addMeeting',
  waitOn: function() {
		return [Meteor.subscribe('meetings'), Meteor.subscribe('lawyers')];

	},
	data: function() {
		var data = {'project': Projects.findOne(this.params._projectId)}; 
		return  data; 
	}
})

// TODO: Remove this right? Meetings should only be added through a project
// Router.route('/meetings/add', {
//   name: 'addMeeting',
//   waitOn: function(){
//       return [Meteor.subscribe('hearings'), Meteor.subscribe('events'), Meteor.subscribe('projects'), Meteor.subscribe('tasks'), Meteor.subscribe('meetings'), Meteor.subscribe('lawyers')];
//   }
// });

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

Router.route('/projects/:_projectId/tasks/add', {
  name: 'addTask',
  waitOn: function() {
		return [Meteor.subscribe('lawyers'), Meteor.subscribe('clients'), Meteor.subscribe('projects')];
	},
	data: function() {
		var data = {'project': Projects.findOne(this.params._projectId)}; 
		return  data; 
	}
})

Router.route('/tasks/add',function(){
	this.render('addTask');
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

Router.route('/tasks/:_id/edit', {
  name: 'editTask',
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
    		return [Meteor.subscribe('hearings'), Meteor.subscribe('events'), Meteor.subscribe('projects'), Meteor.subscribe('tasks'), Meteor.subscribe('courts')];
   	 	}
});

Router.route('/projects', {
  name: 'projects',
  waitOn: function () {
  	return [Meteor.subscribe('projects'), Meteor.subscribe('clients'), Meteor.subscribe('lawyers'), Meteor.subscribe('hearings'), Meteor.subscribe('courts'), Meteor.subscribe('labels')];
  }
});

Router.route('/projects/add', {
  name: 'projectAdd',
  waitOn: function(){
    return [Meteor.subscribe('projects'), Meteor.subscribe('clients'), Meteor.subscribe('lawyers'), Meteor.subscribe('labels')];
  }
})

Router.route('/projects/:_id', {
  name: 'projectDetails',
  waitOn: function() {
    return [Meteor.subscribe('hearings'), Meteor.subscribe('projects'), Meteor.subscribe('courts'), Meteor.subscribe('lawyers'), Meteor.subscribe('clients'), Meteor.subscribe('meetings'), Meteor.subscribe('tasks'), Meteor.subscribe('events')];
  },
  data: function () { return Projects.findOne(this.params._id) }
});

Router.route('/projects/:_id/edit', {
  name: 'projectEdit',
  waitOn: function() {
    return [Meteor.subscribe('hearings'), Meteor.subscribe('clients'), Meteor.subscribe('projects'), Meteor.subscribe('courts'), Meteor.subscribe('lawyers'), , Meteor.subscribe('labels')];
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

Router.route('/projects/:_projectId/hearings/add', {
  name: 'hearingAdd',
  waitOn: function() {
		return [Meteor.subscribe('projects'), Meteor.subscribe('events')];
	},
	data: function() {
		var data = { 
			'project': Projects.findOne(this.params._projectId),
			'user_events' : Events.find({userId : Meteor.userId()})
		}; 
		return  data; 
	}
})

Router.route('/hearings/add', function(){
	this.render('hearingAdd');
});

Router.route('/hearings/:_id', {
  name: 'hearingDetails',
	waitOn: function() {
		return [Meteor.subscribe('hearings'), Meteor.subscribe('projects'), Meteor.subscribe('courts'), Meteor.subscribe('lawyers'), Meteor.subscribe('clients'), Meteor.subscribe('events')];
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