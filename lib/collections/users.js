userProfile = new SimpleSchema({
        name: {
            type: String,
        },
        contactNumber: {
            type: Number,
            min: 9,
            max: 10
        }
});

// TODO: Test why lawyerSchema and clientSchema are not working
// lawyerProfileSchema = new SimpleSchema({
// 	'profile': {
// 		type: Object
// 	},
// 	'profile.name': {
// 		type: String
// 	},
// 	'profile.contactNumber': {
// 		type: String
// 	},
// 	'profile.xyz': {
// 		type: String
// 	}
// });


userSchema = new SimpleSchema({
	'teamId': {
	    type: String,
	    autoValue: function(){
	    	// If i am already logged in, just set the teamId to my teamId
	    	debugger;
	    	if(Meteor.user && Meteor.user())
	    		return Meteor.user().teamId;
	    	// Outside methods this.userId is used
	    	if(this.userId)
	    		return Meteor.users.findOne(this.userId).teamId
	    	// If i am signing up for the first time, set it to the value
	    	else if(this.value)
	    		return this.value;
	    }
	},
	'projectIds': {
		    type: [String],
		    optional: true
		  },
	'username' : {
		// We are assuming that username is an email field which contains primary email
		type : String,
		optional : true
	},
	'roles' : {
		type: [String],
		optional : true
	},
	'profile' : {
		type : userProfile,
		optional : true,
		blackbox : true
	},
	'type' : {
		type : String,
		optional : true
	},
	'emails' : {
		type : [Object],
		optional : true,
		blackbox : true
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

// Define lawyerSchema and clientSchema here
//lawyerSchema = _.extend(lawyerProfileSchema, userSchema);
