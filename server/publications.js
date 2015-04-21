Meteor.startup(function () {
    // Publish the collection. TODO: Only publish part of the collection to which the user has permissions. Also how do we limit data size in meteor? Should be handled with pagination.
  Meteor.publish('clients', function() {
    return Clients.find();
  });

  Meteor.publish('projects', function() {
    return Projects.find();
  })

  Meteor.publish('lawyers', function(){
    return Lawyers.find();
  });

  Meteor.publish('courts', function(){
    return Courts.find();
  })
	
	Meteor.publish('hearings', function(){
		return Hearings.find();
	})
	
	Meteor.publish('events', function(){
		return Events.find();
	})
	
	Meteor.publish('tasks', function(){
		return Tasks.find();
	})
	
	Meteor.publish('meetings', function(){
		return Meetings.find();
	})

  Meteor.publish('allJobs', function(){
    return myJobs.find();
  })
	
	Meteor.publish('timesheets', function(){
		return Timesheets.find();
	})
	
	Meteor.publish('events1', function(){
		return Events1.find();
	})
	
	Meteor.publish('tasks', function(){
		return Tasks.find();
	})

	Meteor.publish('bills', function(){
		return Bills.find();
	})

	Meteor.publish('timesheets', function(){
		return Timesheets.find();
	})
	
	Meteor.publish('events1', function(){
		return Events1.find();
	})

	Meteor.publish('bills', function(){
		return Bills.find();
	})

	Meteor.publish('labels', function(){
		return Labels.find();
	})

	Meteor.publish('communications', function(){
		return Communications.find();
	})
	
});

