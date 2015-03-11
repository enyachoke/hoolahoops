Template.meetingDetails.helpers({
	'matter' : function(){
		var matter = Projects.findOne({_id : this.caseId});
		return matter.name;
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
		Meetings.remove(this._id);
	}
});