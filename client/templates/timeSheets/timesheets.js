Deps.autorun(function(){
	Meteor.subscribe("allusers");
});

Template.timesheets.helpers({
	'timesheets' : function(){
		return Projects.find();
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
	},
	'tasks': function () {
		var options = [];
		_.each(Tasks.find({caseId: Template.instance().caseId.get()}).fetch(), function(element){
			options.push({label: element.desc, value: element._id})
		});
		return options;
	},
	'isTaskDisabled': function(){
		return !Tasks.find({caseId: Template.instance().caseId.get()}).count();
	},
	'runningTimers': function () {
		return runningTimers.get();
	}
});

Template.addTimesheet.created = function () {
	this.caseId = new ReactiveVar(null);
};

Template.addTimesheet.rendered = function() {
	Session.set('lapTime', 0);
	Session.set('timeTracked', 0);
};

Template.runningTimer.helpers({
	'time': function(){
		return Template.instance().data.getTime();
	},
	'isRunning': function(){
		return Template.instance().data.isRunning();
	}
});

Template.runningTimer.events({
	'click .state-change': function(event, template){
		template.data.isRunning() ? template.data.stop() : template.data.start();
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
		if(confirm("Confirm Delete?")) {
			Materialize.toast('Timesheet Deleted!', 1500);
			Timesheets.find({caseId: this._id}).map(function (doc) {
				Timesheets.remove(doc._id);
			});
		}
	}
});

Template.addTimesheet.events({
	'change #timesheet_case': function (event, template) {
		template.caseId.set(template.find("#timesheet_case").value);
	},
	'submit #insertTimesheetForm': function (event, template) {
		event.preventDefault();
		runningTimers.get().push(new timer({running: true}));
		runningTimers.set(runningTimers.get());
	}
});

Template.timesheetRow.events({
	'click .row-clickable': function(event) {
		window.location.assign('/projects/' + this._id + '/timesheets');
		event.stopPropagation();
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
