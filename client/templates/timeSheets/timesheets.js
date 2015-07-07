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
		return formatTime(time.get());
	};

	//Returns the current timer state (Paused or Running)
	this.isRunning = function(){
		return running.get();
	};

	// Start or resume
	this.start = function(){
		if(interval)
			return;
		startAt = startAt ? startAt : now();
		interval = Meteor.setInterval(function(){
			time.set(lapTime + (startAt ? now() - startAt : 0));
		}, 1);
		running.set(true);
	};

	//Stop or pause
	this.stop = function(){
		if(interval == null)
			return;
		Meteor.clearInterval(interval);
		//If running, update elapsed time otherwise keep it
		lapTime = startAt ? lapTime + now() - startAt : lapTime;
		startAt = 0;	// Paused
		running.set(false);
		interval = null;
	};

	//Reset
	this.reset = function(){
		var currentState = running.get();
		this.stop();
		time.set(0);
		startAt = lapTime = 0;
		if(currentState)
			this.start();
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
	var task;
	var description;

	this.getCase = function () {
		return caseId;
	};
	this.getTask = function () {
		return taskId;
	};
	this.getDial = function () {
		return dial;
	};
	this.getType = function () {
		return type;
	};
	this.getDescription = function () {
		return description;
	};

	this.getTimesheet = function () {
		return {
			caseId: this.getCase(),
			taskId: this.getTask(),
			description: this.getDescription(),
			type: this.getType(),
			timerState: this.getDial().getState()
		};
	};

	this.setTimesheet = function (data) {
		if(data.caseId)
			caseId = data.caseId;
		if(data.taskId)
			taskId = data.taskId;
		if(data.type)
			type = data.type;
		if(data.description)
			description = data.description;
		if(data.timerState)
			dial = new timer(data.timerState);
		else
			dial = new timer({running: true});
	};
	this.setTimesheet(timesheetData);
};

var timesheets = ReactiveVar([]);

Accounts.onLogin(function(){
	timesheets = ReactiveVar([]);
	if(window.localStorage.hasOwnProperty('timesheets')){
		delete window.localStorage['timesheets']
	}
})

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
			saveTimesheets.push(currentTimesheets[i].getTimesheet());
		}
		window.localStorage.setItem('timesheets', JSON.stringify(saveTimesheets));
	}
};

Deps.autorun(function(){
	Meteor.subscribe("allusers");
});

Template.timesheets.created = function(){
	this.selectedTimesheet = new ReactiveVar(null);
};

Template.timesheets.rendered = function(){
	var self = this;
	$(document).ready(function(){
    	$('.modal-trigger').leanModal({
    		complete: function() {
    			self.selectedTimesheet.set(null);
    		}
    	});
  	});
};

Template.timesheets.helpers({
	'runningTimsheets': function () {
		return timesheets.get();
	},
	'savedTimesheets': function () {
		return Timesheets.find();
	},
	'selectedTimesheet': function(){
		return Template.instance().selectedTimesheet.get();
	}
});

Template.timesheets.events({
	'click #runningTimesheetList .collection-item': function (event, template) {
		template.selectedTimesheet.set(this);
	}
});

Template.addTimesheet.created = function () {
	this.caseId = new ReactiveVar(null);
};

Template.addTimesheet.helpers({
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

Template.addTimesheet.events({
	'change #timesheet_case': function (event, template) {
		template.caseId.set(template.find("#timesheet_case").value);
	},
	'submit #insertTimesheetForm': function (event, template) {
		event.preventDefault();
		timesheets.get().push(new timesheet(
			{
				caseId: template.find("#timesheet_case").value,
				taskId: template.find("#timesheet_task").value,
				type: template.find("#timesheet_type").value,
				description: template.find("#timesheet_description").value
			}
		));
		timesheets.set(timesheets.get());
		Router.go('timesheets');
	}
});

Template.runningTimesheetRow.helpers({
	'case' : function(){
		return Projects.findOne({_id: this.getCase()}).name;
	},
	'task' : function () {
		return Tasks.findOne({_id: this.getTask()}).desc;
	},
	'duration': function(){
		return this.getDial().getTime();
	},
	'isRunning': function(){
		return this.getDial().isRunning();
	}
});

Template.runningTimesheetRow.events({
	'click .state-change': function(event, template){
		var currentDial = template.data.getDial();
		currentDial.isRunning()?currentDial.stop():currentDial.start();
		event.stopPropagation();
	}
});

Template.runningTimesheetModalBody.helpers({
	'case': function(){
		return this instanceof timesheet ? Projects.findOne({_id: this.getCase()}).name : null;
	},
	'task': function(){
		return this instanceof timesheet ? Tasks.findOne({_id: this.getTask()}).desc : null;
	},
	'isRunning': function(){
		return this instanceof timesheet ? this.getDial().isRunning() : null;
	},
	'duration': function(){
		return this instanceof timesheet ? this.getDial().getTime() : null;
	}
});

Template.runningTimesheetModalBody.events({
	'click #playPause': function(event, template){
		if(currentDial = this instanceof timesheet ? this.getDial() : null){
			if(currentDial.isRunning()){
				currentDial.stop();
			}
			else{
				currentDial.start();
			}
		}
	},
	'click #reset': function(event, template){
		if(this instanceof timesheet){
			this.getDial().reset();
		}
	},
	'click #save': function(event, template){
		if(this instanceof timesheet){
			var index = timesheets.get().indexOf(this);
			if(index>-1){
				var doc = this.getTimesheet();
				this.getDial().stop();
				doc.duration = this.getDial().getTime();
				delete doc.timerState;
				doc.userId = Meteor.userId();
				Meteor.call('saveTimesheetData', doc, function(){
					timesheets.get().splice(index, 1);
					timesheets.set(timesheets.get());
					$('#runningTimesheetDetailModal').closeModal();
				});
			}
		}
	},
	'click .modal-close': function(){
		console.log("abcd");
		$('#runningTimesheetDetailModal').closeModal();
	}
});

Template.savedTimesheetRow.helpers({
	'case': function(){
		return Projects.findOne({_id: this.caseId}).name;
	},
	'task': function(){
		return Tasks.findOne({_id: this.taskId}).desc;
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