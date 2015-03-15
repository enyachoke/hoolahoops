Template.bills.helpers({
	'bills' : function(){
		return Bills.find();
	},

});

Template.billRow.helpers({
	'amount' : function(){
		var amt=0;
		if (this.type == 'hearings'){
			amt = Hearings.findOne(this.hearingId).bill_amt;	
		}
		return amt;
	},
	'date' : function(){
		var date;
		debugger;
		if (this.type == 'hearings'){
			date = Hearings.findOne(this.hearingId).date
		}
		return date;
	},
	'case_title': function(){
		var title;
		if (this.type == 'hearings'){
			debugger;
			var projectId = Hearings.findOne(this.hearingId).caseId;
			title = 'Hearing:'+Projects.findOne(projectId).name;
		}
		return title;
	},
	'clients' : function(){
		var clients =[];
		if (this.type == 'hearings'){
			clientIds  = Projects.findOne(Hearings.findOne(this.hearingId).caseId).clientIds;
			clients = Clients.find({_id: {$in:clientIds}}).fetch();
      	}
      	return clients;
	},
	'lawyers' : function(){
		var lawyers = []
		if (this.type == 'hearings'){
			lawyerIds  = Projects.findOne(Hearings.findOne(this.hearingId).caseId).lawyerIds;
			lawyers = Lawyers.find({_id: {$in:lawyerIds}}).fetch();
      	}
      	return lawyers;
	}
});