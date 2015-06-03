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
		type : String,
		optional : true
	},
	'roles' : {
		type: [String],
		optional : true
	},
	'profile' : {
		type : Object,
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
