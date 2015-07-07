var timer = function(state){
	//Private variables
	var time = new ReactiveVar(0);
	var running = new ReactiveVar(false);
	var startAt = 0;	// Time of last start / resume. (0 if not running)
	var lapTime = 0;	// Time on the clock when last stopped in milliseconds
	var interval = null;

	this.getLapTime = function () {
		return lapTime;
	};

	this.getStartAt = function () {
		return startAt;
	};

	//Private methods
	//Get current time stamp in milliseconds
	var now = function(){
		return (new Date()).getTime();
	};

	var setState = function (newState) {
		if(newState.startAt)
			startAt = newState.startAt;
		if(newState.lapTime)
			lapTime = newState.lapTime;
		if(newState.time)
			time.set(newState.time);
		if(newState.running)
			running.set(newState.running);
	};

	//Public methods
	//Gets the current time elapsed by the timer
	this.getTime = function () {
		return time.get();
	};

	//Returns the current timer state (Paused or Running)
	this.isRunning = function(){
		return running.get();
	};

	// Start or resume
	this.start = function(){
		startAt = startAt ? startAt : now();
		interval = Meteor.setInterval(function(){
			time.set(lapTime + (startAt ? now() - startAt : 0));
		}, 1);
		running.set(true);
	};

	//Stop or pause
	this.stop = function(){
		Meteor.clearInterval(interval);
		//If running, update elapsed time otherwise keep it
		lapTime = startAt ? lapTime + now() - startAt : lapTime;
		startAt = 0;	// Paused
		running.set(false);
	};

	//Reset
	this.reset = function(){
		time.set(0);
		startAt = lapTime = 0;
	};

	this.getState = function () {
		return {
			lapTime: lapTime,
			startAt: startAt,
			time: time.get(),
			running: running.get()
		}
	};

	setState(state);
	if(running.get())
		this.start();
};

var timesheet = function(timesheetData){
	var caseId;
	var taskId;
	var dial;
	this.getCase = function () {
		return caseId;
	};
	this.getTask = function () {
		return taskId;
	};
	this.getDial = function () {
		return dial;
	};
	this.getTimesheet = function () {
		return {
			caseId: getCase(),
			taskId: getTask(),
			timerState: getDial().getState()
		}
	};
	this.setTimesheet = function (data) {
		if(data.caseId)
			caseId = data.caseId;
		if(data.taskId)
			taskId = data.taskId;
		if(data.timerState)
			dial = new timer(data.timerState);
		else
			dial = new timer({running: true});
	};
	this.setTimesheet(timesheetData);
};

timesheets = ReactiveVar([]);
if(savedTimesheets = JSON.parse(window.localStorage.getItem('timesheets'))){
	var toSave = timesheets.get();
	for(var i= 0, length=savedTimesheets.length;i<length;i++) {
		toSave.push(new timesheet(savedTimesheets[i]));
	}
	timesheets.set(toSave);
}

window.onunload = window.onbeforeunload = function () {
	if(currentTimesheets = timesheets.get()){
		var saveTimesheets = [];
		for(var i= 0, length=currentTimesheets.length;i<length;i++){
			saveTimesheets.push(
				{
					caseId: currentTimesheets[i].getCase(),
					taskId: currentTimesheets[i].getTask(),
					timerState: currentTimesheets[i].getDial().getState()
				}
			)
		}
		window.localStorage.setItem('timesheets', JSON.stringify(saveTimesheets));
	}
};

Deps.autorun(function(){
	Meteor.subscribe("allusers");
});

Template.timesheets.helpers({
	'runningTimsheets': function () {
		return timesheets.get();
	}
});

Template.timesheetRow.helpers({
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
	'case' : function(){
		return Projects.findOne({_id: Template.instance().data.getCase()}).name;
	},
	'task' : function () {
		return Tasks.findOne({_id: Template.instance().data.getTask()}).desc;
	},
	'duration': function(){
		return Template.instance().data.getDial().getTime();
	},
	'isRunning': function(){
		return Template.instance().data.getDial().isRunning();
	}
});

Template.runningTimer.events({
	'click .state-change': function(event, template){
		var currentDial = template.data.getDial();
		currentDial.isRunning()?currentDial.stop():currentDial.start();
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
		timesheets.get().push(new timesheet(
			{
				caseId: template.find("#timesheet_case").value,
				taskId: template.find("#timesheet_task").value
			}
		));
		timesheets.set(timesheets.get());
		Router.go('timesheets');
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
