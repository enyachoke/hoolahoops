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
		if(confirm("Meeting Delete?"))
			Meteor.call('removeMeeting', this._id, function(err, result){
				if(result)
					Materialize.toast('Client Deleted!', 1500);
			})
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
			var caseId = this.caseId;
			Meteor.call('removeMeeting', this._id, function(err, result){
				if(result)
					Router.go("/projects/" + caseId);
			})
		}
	}
});

Template.addMeeting.helpers({
	'caseId' : function() {
		debugger;
		return this.project._id;
	}
});

