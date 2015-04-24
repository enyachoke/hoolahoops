Meteor.startup(function () {
	var publishWithRoles = function(namespace, func, roleString){
		var roleString = roleString || namespace;
		var role = 'view-' + roleString;
		
		Meteor.publish(namespace, function(){
			//debugger;
			//console.log("checking", namespace, this.userId, Roles.userIsInRole(this.userId, role));
			//console.log(roleString, role, userId, Roles.userIsInRole(userId, role));
			if(this.userId && Roles.userIsInRole(this.userId, role))
				return func.call(this);
			else{
				var error = new Meteor.Error(401, "Access denied: you cannot view assignments unless you are a member of this group.");
				this.error(error);
			}
		});
	}

    // Publish the collection. TODO: Only publish part of the collection to which the user has permissions. Also how do we limit data size in meteor? Should be handled with pagination.
	publishWithRoles('clients', function() {
		return Meteor.users.find({type : 'client'});
	});

	publishWithRoles('projects', function() {
		return Projects.find();
	});

	publishWithRoles('lawyers', function(){
		return Meteor.users.find({type : 'lawyer'});
	});

	publishWithRoles('courts', function(){
		return Courts.find();
	});
	
	publishWithRoles('hearings', function(){
		return Hearings.find();
	});

	publishWithRoles('events', function(){
		return Events.find();
	});

	publishWithRoles('tasks', function(){
		return Tasks.find();
	});

	publishWithRoles('meetings', function(){
		return Meetings.find();
	});

	publishWithRoles('allJobs', function(){
		return myJobs.find();
	});
	
	publishWithRoles('timesheets', function(){
		return Timesheets.find();
	});
	
	publishWithRoles('events1', function(){
		return Events1.find();
	});
	
	publishWithRoles('tasks', function(){
		return Tasks.find();
	});

	publishWithRoles('bills', function(){
		return Bills.find();
	});

	publishWithRoles('timesheets', function(){
		return Timesheets.find();
	});
	
	publishWithRoles('events1', function(){
		return Events1.find();
	});

	publishWithRoles('bills', function(){
		return Bills.find();
	});

	publishWithRoles('labels', function(){
		return Labels.find();
	});

	publishWithRoles('orders', function(){
		return Orders.find();
	});

	publishWithRoles('groups', function(){
		return Groups.find();
	});

	// TODO: Only do this if can access resource
	publishWithRoles(null, function (){ 
	  return Meteor.roles.find({})
	});

	Meteor.publish('communications', function(){
		return Communications.find();
	})

	
});

