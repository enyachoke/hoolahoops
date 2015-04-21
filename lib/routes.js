Router.plugin('auth');

/* Route function to check if user has permissions to access. Otherwise redirect to unauthorized */
var checkRole = function() {
	if(canAccessUrl(this.url))
		this.next()
	else{
		this.redirect('unauthorized');
		this.stop();
	}
}

/* Function to handle subscriptions and a global error callback in meteor */
var subs = {};

subs.globalErrorHandler = function() {
	Router.go('/unauthorized');
}

subs.subscribe = function() {
	var subscriptions = [];
	
	/* Add a subscription array and attach the global error callback handler */
	_.each(arguments, function(collection){
		var subscription = Meteor.subscribe(collection, {
			onError: subs.globalErrorHandler
		});
		subscriptions.push(subscription);
	});

	return subscriptions;
}

/* Get default route for a user */
var defaultRoute = function() {
	return 'projects';
}

Router.configure({
  'loadingTemplate': 'loading'
});

Router.route('/',{
  name: 'home',
  // TODO: Find a better solution for this than redirect
  onBeforeAction: function () {
    Router.go(defaultRoute());
  }
});

Router.route('/unauthorized', {
	name: 'unauthorized'
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
		return subs.subscribe('lawyers', 'bills', 'projects', 'hearings', 'clients');
	}
});

Router.route('/bills/add',{
	name : 'addBill',
});

Router.route('/bills/:_id',{
	name : 'billDetails',
	waitOn : function(){
		return subs.subscribe('bills', 'projects', 'hearings', 'clients', 'lawyers');
	},
	data : function (){
		debugger;
		return Bills.findOne(this.params._id);
	}
});

Router.route('/bills/:_id/edit',{
	name : 'editBill',
	waitOn : function(){
		return subs.subscribe('bills', 'projects', 'hearings', 'clients');
	}
});

Router.route('/lawyers',{
	name : 'lawyers',
	waitOn : function(){
		return subs.subscribe('lawyers');
	}
});

Router.route('/lawyers/add',{
	name : 'addLawyer'
});

Router.route('/lawyers/:_id/edit',{
	name : 'editLawyer',
	waitOn : function(){
		return subs.subscribe('lawyers');
	},	
  data: function () { return Lawyers.findOne(this.params._id); }
});

Router.route('/lawyers/:_id',{
	name : 'lawyerDetails',
    waitOn: function () {
      return subs.subscribe('lawyers');
    },
	data: function(){ return Lawyers.findOne({_id : this.params._id}) }
});


Router.route('/courts',{
	name : 'courts',
	waitOn : function(){
		return subs.subscribe('courts');
	}
});

Router.route('/courts/add',{
	name : 'addCourt'
});

Router.route('/courts/:_id/edit',{
	name : 'editCourt',
	waitOn : function(){
		return subs.subscribe('courts');
	},	
  data: function () { return Courts.findOne(this.params._id); }
});





Router.route('/clients',{
	name : 'clientsList',
	waitOn : function(){
		return subs.subscribe('clients');
	}
});

Router.route('/timesheets',{
	name : 'timesheets',
	waitOn : function(){
		return subs.subscribe('timesheets', 'projects');
	}
});

Router.route('/timesheets/add',{
	name : 'addTimesheet'
});

Router.route('/timesheets/:_id',{
	name : 'timesheetDetail',
	waitOn : function(){
		return subs.subscribe('timesheets');
	},
	data : function(){ return Timesheets.find({ _id : this.params._id }); }
});

Router.route('/timesheets/:_id/edit',{
	name : 'editTimesheet',
	waitOn : function(){
		return subs.subscribe('timesheets', 'projects');
	},
	data : function(){ return Timesheets.findOne({ _id : this.params._id }); }
});

Router.route('/clients/:_id',{
	name : 'clientDetails',
    waitOn: function () {
    	return subs.subscribe('clients');
    },
	data: function(){ return Clients.findOne({_id : this.params._id}) }
});

Router.route('/clients/:_id/edit',{
	name : 'editClient',
    waitOn: function () {
     	return subs.subscribe('clients');
    },
	data: function(){ return Clients.findOne({_id : this.params._id}) }
});

Router.route('/projects/:_projectId/meetings/add', {
  name: 'addMeeting',
  waitOn: function() {
		return subs.subscribe('meetings', 'lawyers');
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
		return subs.subscribe('hearings', 'events', 'projects', 'tasks', 'meetings');
 	},
	data: function(){ return Meetings.findOne({ _id : this.params._id });}
});

Router.route('/meetings/:_id/edit',{
	name : 'editMeeting',
	waitOn: function() {
		return subs.subscribe('hearings', 'events', 'projects', 'tasks', 'meetings');
 	},
	data: function(){ return Meetings.findOne({ _id : this.params._id });}
});

Router.route('/meetings',{
	name : 'meetings',
    waitOn: function () {
    	return subs.subscribe('meetings', 'projects');
    }
});

Router.route('/projects/:_projectId/tasks/add', {
  name: 'addTask',
  waitOn: function() {
  		return subs.subscribe('lawyers', 'clients', 'projects');
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
		return subs.subscribe('hearings', 'events', 'projects', 'tasks');
 	},
	data : function() { return Tasks.find(); }
});

Router.route('/tasks/:_id', {
  name: 'taskDetails',
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts', 'tasks');
	},
  	data: function () { return Tasks.findOne(this.params._id); }
});

Router.route('/tasks/:_id/edit', {
  name: 'editTask',
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts', 'tasks');
	},
  	data: function () { return Tasks.findOne(this.params._id); }
});

Router.route('/timetracker',{
	name : 'timetracker'
});

Router.route('/calendar',{
		name : 'calendar',
    	waitOn: function() {
    		return subs.subscribe('hearings', 'events', 'projects', 'tasks', 'courts');
   	 	}
});

Router.route('/projects', {
	name: 'projects',
	waitOn: function () {
		return subs.subscribe('projects', 'clients', 'lawyers', 'hearings', 'courts', 'labels');
	},
	onBeforeAction: checkRole
});

Router.route('/projects/add', {
  name: 'projectAdd',
  waitOn: function(){
  	return subs.subscribe('projects', 'clients', 'lawyers', 'labels');
  }
})

Router.route('/projects/:_id', {
  name: 'projectDetails',
  waitOn: function() {
  	return subs.subscribe('hearings', 'projects', 'courts', 'lawyers', 'clients', 'meetings', 'tasks', 'events', 'labels', 'orders');
  },
  data: function () { return Projects.findOne(this.params._id) }
});

Router.route('/projects/:_id/edit', {
  name: 'projectEdit',
  waitOn: function() {
  	return subs.subscribe('hearings', 'clients', 'projects', 'courts', 'lawyers', 'labels');
  },
  data: function () { return Projects.findOne(this.params._id);  }
});


//hearings
Router.route('/hearings', {
  name: 'hearings',
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts');
	},
	data: function() { return Hearings.find(); }
	
});

Router.route('/projects/:_projectId/hearings/add', {
  name: 'hearingAdd',
  waitOn: function() {
		return subs.subscribe('projects');
	},
	data: function() {
		var data = {'project': Projects.findOne(this.params._projectId)}; 
		return  data; 
	}
})

Router.route('/hearings/add', function(){
	this.render('hearingAdd');
});

Router.route('/hearings/:_id', {
  name: 'hearingDetails',
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts', 'lawyers', 'clients');
	},
  	data: function () { return Hearings.findOne(this.params._id); }
});

Router.route('/hearings/:_id/edit', {
  name: 'hearingEdit',
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts', 'lawyers');
	},	
  data: function () { return Hearings.findOne(this.params._id); }
});

// Routes for labels
Router.route('/labels', {
  name: 'labels',
  waitOn: function () {
  	return subs.subscribe('labels');
  }
});

Router.route('/labels/add', {
  name: 'labelAdd',
  waitOn: function(){
    return subs.subscribe('labels');
  }
})

// No need for viewing label separately
// Router.route('/labels/:_id', {
//   name: 'labelDetails',
//   waitOn: function() {
//     return [Meteor.subscribe('labels')];
//   },
//   data: function () { return Labels.findOne(this.params._id) }
// });

Router.route('/labels/:_id/edit', {
  name: 'labelEdit',
  waitOn: function() {
    return subs.subscribe('labels');
  },
  data: function () { return Labels.findOne(this.params._id);  }
});

Router.route('/groups', {
  name: 'groups',
  waitOn: function(){
    return subs.subscribe('groups');
  },
  data: function() { return {'groups': Groups.find()}; }
})