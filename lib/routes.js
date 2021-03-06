/* Route function to check if user has permissions to access. Otherwise redirect to unauthorized */
var checkRole = function(role) {
	//if(canAccessUrl(this.url))
	return function(){
		if(Roles.userIsInRole(Meteor.user(), role))
			this.next()
		else {
			alert('Role Unauthorized!');
			this.redirect('unauthorized');
			this.stop();
		}
	}
}

var checkLoggedIn = function() {
	if (!Meteor.user()){
		Router.go('/login');
    	return false;
	}
	else
		return true;
}

/* Function to handle subscriptions and a global error callback in meteor */
var subs = {};

subs.globalErrorHandler = function(a,b,c,d) {
	debugger;
	console.log(Meteor.user());
	if(checkLoggedIn()){
		// If user is logged in but still faces a subscription error, it is most likely a permission issue
		Router.go('/unauthorized');
	}
		
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

/* Setup onbefore action for all routes */
//Router.before(checkRole, {only: ['login', 'addClient', 'bills', 'addBill', 'billDetails', 'editBill', 'lawyers', 'addLawyer', 'editLawyer', 'lawyerDetails', 'courts']});

Router.route('/',{
  name: 'home',
  // TODO: Find a better solution for this than redirect
  onBeforeAction: function () {
  	Router.go(defaultRoute());
  }
});

/* Accounts templates routing */

Router.route('/unauthorized', {
	name: 'unauthorized'
});

Router.route('/clients/add',{
	name : 'addClient',
	onBeforeAction: checkRole('edit-clients')
});

Router.route('/documents',{
	name: 'docs'
});

Router.route('/mandrill', {where: 'server'})
  .post(function () {
  	  var response = {}
      var events = JSON.parse(this.request.body.mandrill_events);
      	if ( events ) {
      		_.each(events,function(event){
				var subject = event.msg.subject;
				var caseId = subject.match(/[^[\]]+(?=])/g)[0];
				var project = Projects.findOne({ _id : caseId });
				if ( project ){
					var id = Communications.insert({
						caseId : caseId,
						from_email : event.msg.from_email,
						subject : subject,
						text : event.msg.text 	
					});
					response = { _id : id};
				} else {
					response = { error : 'project not found'}
				}
			});
      	}

		this.response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
		this.response.statusCode = 200;	
      	this.response.end(JSON.stringify(response));
  });

Router.route('/bills',{
	name : 'bills',
	onBeforeAction: checkRole('view-bills'),
	waitOn : function(){
		return subs.subscribe('lawyers', 'bills', 'projects', 'hearings', 'clients');
	}
});

Router.route('/bills/add',{
	name : 'addBill',
	onBeforeAction: checkRole('edit-bills')
});

Router.route('/bills/:_id',{
	name : 'billDetails',
	waitOn : function(){
		return subs.subscribe('bills', 'projects', 'hearings', 'clients', 'lawyers');
	},
	onBeforeAction: checkRole('view-bills'),
	data : function (){
		debugger;
		return Bills.findOne(this.params._id);
	}
});

Router.route('/bills/:_id/edit',{
	name : 'editBill',
	onBeforeAction: checkRole('view-bills'),
	waitOn : function(){
		return subs.subscribe('bills', 'projects', 'hearings', 'clients');
	}
});

Router.route('/lawyers',{
	name : 'lawyers',
	onBeforeAction: checkRole('view-lawyers'),
	waitOn : function(){
		return subs.subscribe('lawyers');
	}
});

Router.route('/lawyers/add',{
	name : 'addLawyer',
	onBeforeAction: checkRole('edit-lawyers')
});

Router.route('/lawyers/:_id/edit',{
	name : 'editLawyer',
	onBeforeAction: checkRole('edit-lawyers'),
	waitOn : function(){
		return subs.subscribe('lawyers');
	},	
  data: function () { return Meteor.users.findOne({ _id : this.params._id}); }
});

Router.route('/lawyers/:_id',{
	name : 'lawyerDetails',
    waitOn: function () {
      return subs.subscribe('lawyers');
    },
    onBeforeAction: checkRole('view-lawyers'),
	data: function(){ return Meteor.users.findOne({_id : this.params._id}) }
});


Router.route('/courts',{
	name : 'courts',
	onBeforeAction: checkRole('view-courts'),
	waitOn : function(){
		return subs.subscribe('courts');
	}
});

Router.route('/courts/add',{
	name : 'addCourt',
	onBeforeAction: checkRole('edit-courts')
});

Router.route('/courts/:_id/edit',{
	name : 'editCourt',
	waitOn : function(){
		return subs.subscribe('courts');
	},
	onBeforeAction: checkRole('edit-courts'),
  data: function () { return Courts.findOne(this.params._id); }
});

Router.route('/clients',{
	name : 'clientsList',
	onBeforeAction: checkRole('view-clients'),
	waitOn : function(){
		return subs.subscribe('clients');
	}
});

Router.route('/timesheets',{
	name : 'timesheets',
	/*onBeforeAction: checkRole('view-timesheets'),*/
	waitOn : function(){
		return subs.subscribe('timesheets', 'projects');
	}
});

Router.route('/timesheets/add',{
	name : 'addTimesheet'/*,
	onBeforeAction: checkRole('edit-timesheets')*/
});

Router.route('/projects/:_id/timesheets',{
	name : 'timesheetDetail',
	waitOn : function(){
		debugger;
		return subs.subscribe('timesheets', 'projects');
	},
	onBeforeAction: checkRole('view-timesheets'),
	data : function(){ return Timesheets.find({ caseId : this.params._id }); }
});

Router.route('/timesheets/:_id/edit',{
	name : 'editTimesheet',
	waitOn : function(){
		return subs.subscribe('timesheets', 'projects');
	},
	onBeforeAction: checkRole('view-timesheets'),
	data : function(){ return Timesheets.findOne({ _id : this.params._id }); }
});

Router.route('/clients/:_id',{
	name : 'clientDetails',
    waitOn: function () {
    	return subs.subscribe('clients');
    },
    onBeforeAction: checkRole('view-clients'),
	data: function(){ return Meteor.users.findOne({_id : this.params._id}) }
});

Router.route('/clients/:_id/edit',{
	name : 'editClient',
    waitOn: function () {
     	return subs.subscribe('clients');
    },
    onBeforeAction: checkRole('edit-clients'),
	data: function(){ return Meteor.users.findOne({_id : this.params._id}) }
});

Router.route('/projects/:_projectId/meetings/add', {
  name: 'addProjectMeeting',
  template: 'addMeeting',
  waitOn: function() {
		return subs.subscribe('meetings', 'lawyers', 'projects');
	},
	onBeforeAction: checkRole('edit-projects', 'edit-meetings'),
	data: function() {
		var data = {'project': Projects.findOne( { _id : this.params._projectId } ) }; 
		return  data; 
	}
})

Router.route('/meetings/add', {
	name: 'addMeeting',
	template: 'addMeeting',
	waitOn: function(){
		return subs.subscribe('meetings', 'lawyers', 'projects');
	},
	onBeforeAction: checkRole('edit-projects', 'edit-meetings')
});

Router.route('/meetings/:_id',{
	name : 'meetingDetails',
	waitOn: function() {
		return subs.subscribe('hearings', 'events', 'projects', 'tasks', 'meetings');
 	},
 	onBeforeAction: checkRole('view-projects', 'view-meetings'),
	data: function(){ return Meetings.findOne({ _id : this.params._id });}
});

Router.route('/meetings/:_id/edit',{
	name : 'editMeeting',
	waitOn: function() {
		return subs.subscribe('hearings', 'events', 'projects', 'tasks', 'meetings');
 	},
 	onBeforeAction: checkRole('edit-projects', 'edit-meetings'),
	data: function(){ return Meetings.findOne({ _id : this.params._id });}
});

Router.route('/meetings',{
	name : 'meetings',
	onBeforeAction: checkRole('view-projects', 'view-meetings'),
    waitOn: function () {
    	return subs.subscribe('meetings', 'projects');
    }
});

Router.route('/projects/:_projectId/tasks/add', {
  name: 'addProjectTask',
  template: 'addTask',
  onBeforeAction: checkRole('edit-projects', 'edit-tasks'),
  waitOn: function() {
  		return subs.subscribe('lawyers', 'clients', 'projects');
	},
	data: function() {
		var data = {'project': Projects.findOne(this.params._projectId)}; 
		return  data; 
	}
})

Router.route('/tasks/add', {
	name: 'addTask',
	onBeforeAction: checkRole('edit-projects', 'edit-tasks'),
	waitOn: function() {
		return subs.subscribe('lawyers', 'clients', 'projects');
	}
})

Router.route('/tasks',{
	name : 'tasks',
	onBeforeAction: checkRole('view-projects', 'view-tasks'),
	waitOn: function() {
		return subs.subscribe('hearings', 'events', 'projects', 'tasks');
 	},
	data : function() { return Tasks.find(); }
});

Router.route('/tasks/:_id', {
  name: 'taskDetails',
  onBeforeAction: checkRole('view-projects', 'view-tasks'),
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts', 'tasks');
	},
  	data: function () { return Tasks.findOne(this.params._id); }
});

Router.route('/tasks/:_id/edit', {
  name: 'editTask',
  onBeforeAction: checkRole('edit-projects', 'edit-tasks'),
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
		onBeforeAction: checkRole('view-calendars'),
    	waitOn: function() {
    		return subs.subscribe('hearings', 'events', 'projects', 'tasks', 'courts', 'meetings');
   	 	}
});

Router.route('/projects', {
	name: 'projects',
	waitOn: function () {
		return subs.subscribe('projects', 'clients', 'lawyers', 'hearings', 'courts', 'labels');
	},
	onBeforeAction: checkRole('view-projects'),
});

Router.route('/projects/add', {
  name: 'projectAdd',
  waitOn: function(){
  	return subs.subscribe('projects', 'clients', 'lawyers', 'labels');
  },
	onBeforeAction: checkRole('edit-projects')
})

Router.route('/projects/:_id', {
  name: 'projectDetails',
  onBeforeAction: checkRole('view-projects'),
  waitOn: function() {
  	return subs.subscribe('hearings', 'projects', 'courts', 'lawyers', 'clients', 'meetings', 'tasks', 'events', 'labels', 'orders');
  },
  data: function () { return Projects.findOne(this.params._id) }
});

Router.route('/projects/:_id/orders',{
	name : 'projectOrderDetails',
	waitOn : function(){
		debugger;
		return subs.subscribe('orders', 'projects');
	},
	onBeforeAction: checkRole('view-orders'),
	data : function(){ return {orders: Orders.find({ caseId : this.params._id })}; }
});

Router.route('/projects/:_id/edit', {
  name: 'projectEdit',
  onBeforeAction: checkRole('edit-projects'),
  waitOn: function() {
  	return subs.subscribe('hearings', 'clients', 'projects', 'courts', 'lawyers', 'labels');
  },
  data: function () { debugger;return Projects.findOne(this.params._id);  }
});


//hearings
Router.route('/hearings', {
  name: 'hearings',
  onBeforeAction: checkRole('view-projects', 'view-hearings'),
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts');
	},
	data: function() { return Hearings.find(); }
	
});

Router.route('/projects/:_projectId/hearings/add', {
  name: 'addProjectHearing',
  template: 'hearingAdd',
  onBeforeAction: checkRole('edit-projects', 'edit-hearings'),
  waitOn: function() {
		return subs.subscribe('projects', 'events');
	},
	data: function() {
		var data = { 
			'project': Projects.findOne(this.params._projectId),
			'user_events' : Events.find({userId : Meteor.userId()})
		}; 
		return  data; 
	}
})

Router.route('/hearings/add', {
	name: 'addHearing',
	template: 'hearingAdd',
	onBeforeAction: checkRole('edit-projects', 'edit-hearings'),
	waitOn: function(){
		return subs.subscribe('projects', 'events');
	}
});

Router.route('/hearings/:_id', {
  name: 'hearingDetails',
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts', 'lawyers', 'clients');
	},
	onBeforeAction: checkRole('view-projects', 'view-hearings'),
  	data: function () { return Hearings.findOne(this.params._id); }
});

Router.route('/hearings/:_id/edit', {
  name: 'hearingEdit',
	waitOn: function() {
		return subs.subscribe('hearings', 'projects', 'courts', 'lawyers');
	},	
	onBeforeAction: checkRole('edit-projects', 'edit-hearings'),
  data: function () { return Hearings.findOne(this.params._id); }
});

// Routes for labels
Router.route('/labels', {
  name: 'labels',
  onBeforeAction: checkRole('view-labels'),
  waitOn: function () {
  	return subs.subscribe('labels');
  }
});

Router.route('/labels/add', {
  name: 'labelAdd',
  waitOn: function(){
    return subs.subscribe('labels');
  },
  onBeforeAction: checkRole('edit-labels')
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
  onBeforeAction: checkRole('view-labels'),
  data: function () { return Labels.findOne(this.params._id);  }
});

Router.route('/groups', {
  name: 'groups',
  waitOn: function(){
    return subs.subscribe('groups');
  },
  onBeforeAction: checkRole('view-groups'),
  data: function() { return {'groups': Groups.find()}; }
})

Router.route('/communications', {
	name : 'communications',
	waitOn : function() {
		return [Meteor.subscribe('projects')];
	}
});

Router.route('/projects/:_id/communications', {
	name : 'communicationsCaseWise',
	waitOn : function() {
		return [Meteor.subscribe('projects'),Meteor.subscribe('communications')];
	},
	data : function () { 
		return Communications.find({ caseId : this.params._id});
	}
});

Router.route('/projects/:_subjectId/communications/:_id',{
	name : 'communicationDetails',
	waitOn : function() {
		return [Meteor.subscribe('communications')];
	},
	data : function() {
		return Communications.findOne(this.params._id);
	}
});

// Accounts Templates
AccountsTemplates.configure({
    forbidClientAccountCreation: true
});

AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'login',
    redirect: '/projects',
    layoutTemplate: 'layout'
});

// TODO: Remove this _init call
AccountsTemplates._init();

// Check if user authenticated
Router.onRun(function() {
	if (!Meteor.user() && this.ready())
        return this.redirect('/login');
    else
    	this.next();
}, {except: ['login']}); 