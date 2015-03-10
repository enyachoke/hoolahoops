Template.timesheets.helpers({
	'timesheets' : function(){
		return Timesheets.find();
	}
});

Template.timesheetRow.helpers({
	'case' : function(){
		return Projects.findOne({ _id: this.caseId }).name;
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