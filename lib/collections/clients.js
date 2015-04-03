clientSchema = new SimpleSchema({
	'name' : {
		type: String,
		optional : true,
		label : 'Name'
	},
	// projectIds: {
		//     type: [String],
		//     optional: true
		//   },
	'phone' :  {
		optional : true,
		type : Number,
		label : 'Phone Number'
	},
	'email' : {
		optional : true,
		type : String,
		label : 'Email'
	}
  
	});

	Clients = new Meteor.Collection('clients')
	Clients.initEasySearch('name')
	Clients.attachSchema(clientSchema);