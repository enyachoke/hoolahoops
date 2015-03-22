// Project hooks
Projects.after.insert(function(projectId, doc){
	_.each(doc.reminders, function(reminder){
		// TODO: Group emails by date
		var job = myJobs.createJob('addDemo', {'name': 'Send Email', 'template': 'standard', 'merge_vars': toMandrillArray(doc), 'to': reminder.email});
		var delayMilliSeconds = Math.abs(reminder.date - new Date());
		job.retry({retries: 4, wait: 2*60*1000});
		job.delay(delayMilliSeconds);
		job.save();
	})

	// Projects.update( { _id : projectId }, {$set : { uniqueId : Courts.findOne({_id: doc.courtId}).code+"-"+ projectId } } );
	
});

Projects.before.insert(function(id, doc){
	var shortId = Meteor.npmRequire('shortid');
// 	function makeid()
// {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for( var i=0; i < 5; i++ )
//         text += possible.charAt(Math.floor(Math.random() * possible.length));

//     return text;
// }
	doc.uniqueId = Courts.findOne({_id: doc.courtId}).code+"-"+ shortId.generate();
});


// Projects.after.insert(function(projectId, doc){
// 	Router.go('/projects/' + projectId);
// })

Projects.after.remove(function (userId, doc) {
  // ...remove hearings 
  _.each(doc.hearingIds,function(id){
  	Hearings.remove({_id : id});
  });

  //...remove meetings
  _.each(doc.meetingIds,function(id){
  	Meetings.remove({_id : id});
  });

  //...remove tasks
  _.each(doc.taskIds,function(id){
  	Tasks.remove({_id : id});
  });

  //...remove timesheets
  _.each(doc.timesheetIds,function(id){
  	Timesheets.remove({_id : id});
  })

});

//hearing hooks
Hearings.after.insert( function(hearingId, doc){
	//update project : push _id to project.hearingIds
	Projects.update( { _id: doc.caseId },{ $push: { hearingIds: doc._id } });

	//insert event
	var event_res = Events.insert({
		'hearingId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'hearings'
	});
	console.log('event_res',event_res);
	Hearings.update( { _id: doc._id },{ $push: { eventIds: event_res } });
	Projects.update( { _id: doc.caseId },{ $push: { eventIds: event_res } });

	var bill_res = Bills.insert({
					'hearingId' : doc._id,
					'type' : 'hearings',
					'paid' : false 
				});
	console.log('bill_res',bill_res);

	Hearings.update( { _id: doc._id },{ $push: { billIds: bill_res } });
	Projects.update( { _id: doc.caseId },{ $push: { billIds: bill_res } });
	
});

Hearings.after.remove(function( hearingId, doc){

	//...remove id from project:hearingIds
	Projects.update( { _id : doc.projectId }, { $pull : { hearingIds : doc._id } } );

	//...remove events
  	_.each(doc.eventIds,function(id){
  		Events.remove({_id : id});
  	});

  	//...remove bills
  	_.each(doc.billIds,function(id){
  		Bills.remove({_id : id});
  	});
});


//meeting hooks
Meetings.after.insert( function(meetingId, doc){

	// add meeting to project
	Projects.update( { _id: doc.caseId },{ $push: { meetingIds: doc._id } });

	// insert event
	var res = Events.insert({
		'meetingId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'meetings',
		'date' : doc.date
	});

	Meetings.update( { _id: doc._id },{ $push: { eventIds: res } });
	Projects.update( { _id: doc.caseId },{ $push: { eventIds: res } });
});

Meetings.after.remove(function( meetingId, doc){

	//...remove ids from project
	Projects.update( { _id: doc.caseId }, { $pull: { meetingIds: doc._id } } );

	 //...remove events
  	_.each(doc.eventIds,function(id){
  		Events.remove({_id : id});
  	});

});


//task hooks
Tasks.after.insert( function(taskId, doc){
	console.log('hook',doc);
	//add task to project
	Projects.update( { _id: doc.caseId }, { $push: { taskIds: doc._id } } );

	// insert event
	var res = Events.insert({
		'taskId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'tasks',
		'date' : doc.date
	});

	Tasks.update( { _id: doc._id },{ $push: { eventIds: res } });
	Projects.update( { _id: doc.caseId },{ $push: { eventIds: res } });
});

Tasks.after.remove(function( taskId, doc){

	//...remove ids from project
	Projects.update( { _id: doc.caseId }, { $pull: { taskIds: doc._id } } );

	 //...remove events
  	_.each(doc.eventIds,function(id){
  		Events.remove({_id : id});
  	});

});

Timesheets.after.insert(function(id, doc){
	Projects.update( { _id: doc.caseId },{ $push: { timesheetIds: doc._id } });
	Router.go('/projects');
});

Timesheets.before.insert(function(id, doc){
	doc.userId = Meteor.userId();
});

Timesheets.after.remove(function(id, doc){
	Projects.update( { _id: doc.caseId }, { $pull: { timesheetIds: doc._id } } );
});






