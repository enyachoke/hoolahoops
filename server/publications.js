Meteor.startup(function () {
	var publishWithRoles = function(namespace, func, roleString){
		log.info("publishWithRoles: ","checking", roleString);
		var roleString = roleString || namespace;
		var role = 'view-' + roleString;

		Meteor.publish(namespace, function(){
			//debugger;
			if(this.userId && Roles.userIsInRole(this.userId, role))
				return func.call(this);
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

	// TODO: test if this can be moved to publishWithRoles
	Meteor.publish(null, function (){
	  return Meteor.roles.find({})
	});

	Meteor.publish('communications', function(){
		return Communications.find();
	});

	Meteor.publish('notifications', function() {
		return Notifications.find();
	});

});
