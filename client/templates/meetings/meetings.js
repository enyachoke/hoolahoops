Template.meetingDetails.helpers({
	'matter' : function(){
		var matter = Projects.findOne({_id : this.caseId});
		return matter.name;
	},
	'formatted_date' : function (){
		debugger;
		return this.date.format('{dd}-{month}-{yy}');
	}
});

Template.meetingDetails.events({
	'click .delete' : function(e){
		if(confirm("Confirm Delete?"))
			Meetings.remove(this._id);
	}
});

Template.meetings.helpers({
	'meetings' : function(){
		return Meetings.find();
	}
	
});

Template.meetingRow.helpers({
	'matter' : function(){
		var matter = Projects.findOne({_id : this.caseId});
		return matter.name;
	}
});

Template.meetingRow.events({
	'click .delete' : function(){
		if(confirm("Confirm Delete?")) {
			Meetings.remove(this._id);
			Router.go("/projects/" + this.caseId);
		}
	}
});

Template.addMeeting.helpers({
	'caseId' : function() {
		debugger;
		return this.project._id;
	}
});

