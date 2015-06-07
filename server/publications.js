Meteor.startup(function () {
	// Gives access to user object and handles error
	var publishWithRoles = function(namespace, func, roleString){
		log.info("publishWithRoles: ","checking", roleString);
		var roleString = roleString || namespace;
		var role = 'view-' + roleString;
		
		Meteor.publish(namespace, function(){
			var user = Meteor.users.findOne(this.userId);
			//debugger;
			if(this.userId && Roles.userIsInRole(this.userId, role))
				return func.call(this, user);
			else{
				debugger;
				log.error("checking", namespace, this.userId, Roles.userIsInRole(this.userId, role));
				log.error(roleString, role, this.userId, Roles.userIsInRole(this.userId, role));
				var error = new Meteor.Error(401, "Access denied: you cannot view " + roleString + " unless you are a member of this group.");
				this.error(error);
			}
		});
	}

    // Publish the collection. TODO: Only publish part of the collection to which the user has permissions. Also how do we limit data size in meteor? Should be handled with pagination.
	publishWithRoles('clients', function(user) {
		return Meteor.users.find({type : 'client', teamId: user.teamId});
	});

	publishWithRoles('projects', function(user) {
		return Projects.find({teamId: user.teamId});
	});

	publishWithRoles('lawyers', function(user){
		return Meteor.users.find({type : 'lawyer', teamId: user.teamId});
	});

	publishWithRoles('courts', function(user){
		return Courts.find({teamId: user.teamId});
	});
	
	publishWithRoles('hearings', function(user){
		return Hearings.find({teamId: user.teamId});
	});

	publishWithRoles('events', function(user){
		return Events.find({teamId: user.teamId});
	});

	publishWithRoles('tasks', function(user){
		return Tasks.find({teamId: user.teamId});
	});

	publishWithRoles('meetings', function(user){
		return Meetings.find({teamId: user.teamId});
	});

	// TODO: Is this needed? Or should it be removed?
	// publishWithRoles('allJobs', function(){
	// 	return myJobs.find({teamId: user.teamId});
	// });
	
	publishWithRoles('timesheets', function(user){
		return Timesheets.find({teamId: user.teamId});
	});
	
	publishWithRoles('bills', function(user){
		return Bills.find({teamId: user.teamId});
	});

	publishWithRoles('labels', function(user){
		return Labels.find({teamId: user.teamId});
	});

	publishWithRoles('orders', function(user){
		return Orders.find({teamId: user.teamId});
	});

	publishWithRoles('groups', function(user){
		return Groups.find({teamId: user.teamId});
	});

	// TODO: test if this can be moved to publishWithRoles
	Meteor.publish(null, function (){ 
	  return Meteor.roles.find({})
	});

	// TODO: Move this to publish with roles
	Meteor.publish('communications', function(){
		var user = Meteor.users.findOne(this.userId);
		return Communications.find({teamId: user.teamId});
	})

	
});

