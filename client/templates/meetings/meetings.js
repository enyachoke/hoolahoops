Template.meetingDetails.helpers({
	'matter' : function(){
		debugger;
		var matter = Projects.findOne({_id : this.caseId});
		return matter.name;
	}
});

