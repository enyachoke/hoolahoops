orderSchema = new SimpleSchema({
	'link' : {
		type: String,
		optional : true,
		label : 'Name'
	}
	
	});

Orders = new Meteor.Collection('orders')
Orders.attachSchema(orderSchema);