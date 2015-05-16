userSchema = new SimpleSchema({
	'name' : {
		type: String,
		optional : true,
		label : 'Name'
	},
	'projectIds': {
		    type: [String],
		    optional: true
		  },
	'contactNumber' :  {
		optional : true,
		type : Number,
		label : 'Phone Number'
	},
	'email' : {
		optional : true,
		type : String,
		label : 'Email'
	},
	'username' : {
		type : String,
		optional : true
	},
	'roles' : {
		type: [String],
		optional : true
	},
	'profile' : {
		type : Object,
		optional : true
	},
	'type' : {
		type : String,
		optional : true
	},
	'emails' : {
		type : [Object],
		optional : true
	},
	'services' : {
		type : Object,
		blackbox: true,
		optional : true
	},
	'createdAt' : {
		type : Date,
		optional : true
	}
});

Users = Meteor.users
Users.attachSchema(userSchema);
