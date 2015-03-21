Template.bills.helpers({
	'bills_unpaid' : function(){
		return Bills.find({'paid' : false});
	},
	'bills_paid' : function(){
		return Bills.find({'paid' : true});
	},
	'settings' : function(){
		// var case_title="";
		var bills_client_array = [];
		// ;
		// Bills.find().fetch().forEach(function(b){
		// 	//console.log(e)
		// 	var date;
		// 	if (b.type == 'hearings') {
		// 		date = Hearings.findOne(b.hearingId).date
		// 	} 
		// 	bills_client_array.push({
		// 		'date' : date
		// 	});
		// });
		return {
            collection: Bills.find(),
            rowsPerPage: 10,
            showFilter: true,
            fields : [
            	{
			        fieldId: 'date',
			        key: 'date',
			        label: 'Date',
			        fn: function (value, object) {
			        	var date;
						if (object.type == 'hearings'){
							date = Hearings.findOne(object.hearingId).date
						}
						return date; 
			        }
    			},
    			{
    				fieldId: 'type',
    				key: 'type',
    				label: 'Type',
    				fn: function( value, object ){
    					return object.type;		
    				}
    			},
    			{
    				fieldId: 'case_title',
    				key: 'case_title',
    				label: 'Matter',
    				fn: function ( value, object) {
    					var title;
						if (object.type == 'hearings'){
							var projectId = Hearings.findOne(object.hearingId).caseId;
							case_title = Projects.findOne(projectId).name;
						}
						return case_title;
    				} 
    			},
    		
    			{
    				fieldId: 'clients',	
    				key: 'clients',
    				label: 'Clients',
    				fn: function(value, object) {
    					var clients =[],list="";
						if (object.type == 'hearings'){
							clientIds  = Projects.findOne(Hearings.findOne(object.hearingId).caseId).clientIds;
							clients = Clients.find({_id: {$in:clientIds}}).fetch();
				      	}
				      	
				      	clients.forEach(function(c){
				      		
				      		list = list + '<a href=/clients/'+c._id+'>'+c.name+' </a>';
				      	});
				      	return new Spacebars.SafeString(list);
    				} 
    			},
    			{
    				fieldId: 'lawyers',
    				key: 'lawyers',
    				label: 'Lawyers',
    				fn: function( value, object) {
    					var lawyers = [],list="";
						if (object.type == 'hearings'){
							lawyerIds  = Projects.findOne(Hearings.findOne(object.hearingId).caseId).lawyerIds;
							lawyers = Lawyers.find({_id: {$in:lawyerIds}}).fetch();
				      	}
						lawyers.forEach(function(c){
				      		list = list + '<a href=/lawyers/'+c._id+'>'+c.name+' </a>';
				      	});
				      	return new Spacebars.SafeString(list);
    				}
    			},
    			{
    				fieldId: 'amt',
    				key: 'amt',
    				label : 'Amount',
    				fn:function(value, object) {
    					var amt=0;
						if (object.type == 'hearings'){
							amt = Hearings.findOne(object.hearingId).bill_amt;	
						}
						return amt;
    				}
    			}
            ]
        };
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
	'click .bill_details' : function(event, template){
		 ;
	}
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
		return date;
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
		return date;
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