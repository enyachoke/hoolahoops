Template.bills.helpers({
	'bills_unpaid' : function(){
		return Bills.find({'paid' : false});
	},
	'bills_paid' : function(){
		return Bills.find({'paid' : true});
	},
	'hearings' : function(){
		return Hearings.find();
	},
	'bills_unpaid_exist' : function(){
		return Bills.find({'paid' : false}).fetch().length > 0 ? true : false;
	}
});

Template.billRow.events({
	'change .paid' : function(event, template){
		console.log(event.target.id);
	},
	// 'click .bill_details' : function(event, template){
	// 	 ;
	// }
});

Template.bills.events({

	'click #mark_as_paid' : function(event, template){
		$('input[class="paid"]:checked').each(function(index, value){
			Bills.update(value.id, {"$set" : {"paid" : true }});
		});
	},
	'click #mark_as_unpaid' : function(event, template){
		$('input[class="paid"]:checked').each(function(index, value){
			Bills.update(value.id, {"$set" : {"paid" : false }});
		});
	}
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
		 ;
		if (this.type == 'hearings'){
			date = Hearings.findOne(this.hearingId).date
		}
		return date.format('{dd}-{month}-{yy}');
	},
	'case_title': function(){
		var title;
		if (this.type == 'hearings'){
			 ;
			var projectId = Hearings.findOne(this.hearingId).caseId;
			title = 'Hearing:'+Projects.findOne(projectId).name;
		}
		return title;
	},
	'clients' : function(){
		var clients =[];
		if (this.type == 'hearings'){
			clientIds  = Projects.findOne(Hearings.findOne(this.hearingId).caseId).clientIds;
			clients = Users.find({_id: {$in:clientIds}}).fetch();
      	}
      	return clients;
	},
	'lawyers' : function(){
		var lawyers = []
		if (this.type == 'hearings'){
			lawyerIds  = Projects.findOne(Hearings.findOne(this.hearingId).caseId).lawyerIds;
			lawyers = Users.find({_id: {$in:lawyerIds}}).fetch();
      	}
      	return lawyers;
	}
});

Template.billRow.events({
	'click .row-clickable': function(event) {
		event.stopPropagation();
	}
});

Template.billDetails.helpers({
	'amount' : function(){
		var amt=0;

		if (this.type == 'hearings'){
			amt = Hearings.findOne(this.hearingId).bill_amt;
		}
		debugger;
		return amt;
	},
	'date' : function(){
		var date;
		 ;
		if (this.type == 'hearings'){
			date = Hearings.findOne(this.hearingId).date
		}
		return date.format('{dd}-{month}-{yy}');
	},
	'case_title': function(){

			 ;
		var title;
		if (this.type == 'hearings'){
			var projectId = Hearings.findOne(this.hearingId).caseId;
			title = 'Hearing:'+Projects.findOne(projectId).name;
		}
		return title;
	},
	'clients' : function(){
		var clients =[];
		if (this.type == 'hearings'){
			clientIds  = Projects.findOne(Hearings.findOne(this.hearingId).caseId).clientIds;
			clients = Users.find({_id: {$in:clientIds}}).fetch();
      	}
      	return clients;
	},
	'lawyers' : function(){
		var lawyers = []
		if (this.type == 'hearings'){
			lawyerIds  = Projects.findOne(Hearings.findOne(this.hearingId).caseId).lawyerIds;
			lawyers = Users.find({_id: {$in:lawyerIds}}).fetch();
      	}
      	return lawyers;
	},
	'lawyer' : function(){
		var lawyer = ""
		if (this.type == 'hearings'){
			lawyer = Meteor.users.findOne(Hearings.findOne(this.hearingId).lawyerId);

      	}
      	return lawyer;
	},
	'project' : function(){
		debugger;
	}
});
