orderSchema = new SimpleSchema({
	'teamId': {
	    type: String,
	    autoValue: function(){
	      return Meteor.user().teamId;
	    }
  	},
	'link' : {
		type: String,
		optional : true,
		label : 'Name'
	},
	'caseId' : {
		type : String,
		label : 'case',
		optional : true
	}
	
	});

Orders = new Meteor.Collection('orders')
Orders.attachSchema(orderSchema);