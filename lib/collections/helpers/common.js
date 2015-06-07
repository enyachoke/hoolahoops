setTeamId = function(){
	    	// If i am already logged in, just set the teamId to my teamId
	    	try {
	    		var teamId = Meteor.user().teamId;
	    		return teamId;
	    	}
	    	catch(error){
	    		log.error(error, error.stack, "Error from user schema validation");
	    		// Outside methods this.userId is used
	    		if(this.userId)
	    			return Meteor.users.findOne(this.userId).teamId
	    		// If i am signing up for the first time, set it to the value
	    		else if(this.value)
	    			return this.value;
	    	}
	    	
	    }