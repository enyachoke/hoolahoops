// Project hook(er)s?
Projects.after.insert(function(projectId, doc){
	Projects.update( { _id : projectId }, {$set : { uniqueId : Courts.findOne({_id: doc.courtId}).code+"-"+ projectId } } );

	// Reminders
	doc = Projects._transform(doc);
	parseReminders(doc, 'projects');
	// Add statute of limitation reminder for lawyers + clients 1 day before st
	// Add follow up reminder for lawyers 1 day before
	addEmailReminder(doc, 'projects', 'Statute of limitation for your matter is approaching.', doc.lawyers().concat(doc.clients()), doc.reminderStatuteDate());
	addEmailReminder(doc, 'projects', 'A follow up date for your matter is approaching.', doc.lawyers(), doc.reminderFollowUpDate());

	addScraperJob(doc);
});

Projects.after.update(function(id, doc){
	addScraperJob(doc);
})

Projects.before.insert(function(id, doc){
	var shortId = Meteor.npmRequire('shortid');
	doc.uniqueId = Courts.findOne({_id: doc.courtId}).code+"-"+ shortId.generate();
});

Projects.after.remove(function (userId, doc) {
	// TODO: We should have a system like ruby on rails activerecord where user just specifies dependencies and the dependent fields are added removed automatically
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

  removeScraperJob(doc);

});

//hearing hooks
Hearings.after.insert( function(hearingId, doc){

	

	//update project : push _id to project.hearingIds
	Projects.update( { _id: doc.caseId },{ $push: { hearingIds: doc._id } });

	//insert event
	var event_res = Events.insert({
		'hearingId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'hearings',
		'userIds' : [doc.lawyerId]
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

	// Reminders
	doc = Hearings._transform(doc);
	parseReminders(doc, 'hearings');
	// Add email reminder before hearing date
	addEmailReminder(doc, 'hearings', 'A hearing for your matter is due soon.', doc.project().clients().concat(doc.lawyer()), doc.reminderHearingDate());
	
});

Hearings.after.remove( function( hearingId, doc){

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

Meetings.before.insert( function( userId, doc){
	doc.userId = userId;
});

Meetings.after.insert( function(userId, doc){
	debugger;
	// add meeting to project
	Projects.update( { _id: doc.caseId },{ $push: { meetingIds: doc._id } });

	// insert event
	var res = Events.insert({
		'meetingId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'meetings',
		'date' : doc.date,
		'userIds' : [userId]
	});

	Meetings.update( { _id: doc._id },{ $push: { eventIds: res } });
	Projects.update( { _id: doc.caseId },{ $push: { eventIds: res } });

	// Insert reminders
	parseReminders(doc, 'meetings');
	// Add reminder 1 day before meeting
	//doc = Meetings._transform(doc);
	parseReminders(doc, 'meetings');
	// Add email reminder before hearing date
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
Tasks.after.insert( function(userId, doc){
	debugger;
	console.log('hook',doc);
	//add task to project
	Projects.update( { _id: doc.caseId }, { $push: { taskIds: doc._id } } );

	// insert event
	var res = Events.insert({
		'taskId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'tasks',
		'date' : doc.date,
		'userIds' : doc.userIds
	});

	Tasks.update( { _id: doc._id },{ $push: { eventIds: res } });
	Projects.update( { _id: doc.caseId },{ $push: { eventIds: res } });

	// Insert reminder
	//doc = Tasks._transform(doc);
	parseReminders(doc, 'tasks');
	// Add email reminder before tasl deadline
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
});

Timesheets.before.insert(function(id, doc){
	doc.userId = Meteor.userId();
});

Timesheets.after.remove(function(id, doc){
	Projects.update( { _id: doc.caseId }, { $pull: { timesheetIds: doc._id } } );
});






