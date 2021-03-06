// Project hook(er)s?
Projects.after.insert(function(projectId, doc){

	// Reminders
	doc = Projects._transform(doc);
	
	// TODO: Move these into something like a transform function which should prefetch clients and lawyers
	doc.lawyersData = doc.lawyers();
	doc.clientsData = doc.clients();
	//doc.replyTo = doc.
	doc.path = sprintf('projects/%s', doc._id);
	parseReminders(doc, 'projects');

	// Add statute of limitation reminder for lawyers + clients 1 day before st
	// Add follow up reminder for lawyers 1 day before
	//debugger;
	// Always add clients with lawyers so that we can reply to all	
	addEmailReminder(doc, 'projects-client', '', doc.clients().concat(doc.lawyers()), doc.lawyers()[0].email, sprintf('[%s] Matter created: %s', doc._id, doc.name));
	addEmailReminder(doc, 'projects-lawyer', '', doc.lawyers(), doc.lawyers()[0].email, sprintf('[%s] Matter assigned: %s', doc._id, doc.name));
	addEmailReminder(doc, 'projects-bill', '', ACCOUNTS_EMAILS, doc.lawyers()[0].email, sprintf('[%s] Matter created: %s', doc._id, doc.name));
	addEmailReminder(doc, 'projects', 'A follow up date for your matter is approaching.', doc.lawyers(), doc.lawyers()[0].email, sprintf('[%s] Followup date for your matter: %s is due soon', doc._id, doc.name), doc.reminderFollowUpDate());
	if(doc.statute_of_limitation)
		addEmailReminder(doc, 'projects', 'Statute of limitation for your matter is approaching.', doc.lawyers().concat(doc.clients()), doc.lawyers()[0].email, sprintf('[%s] Statute of limitation for your matter: %s is due soon', doc._id, doc.name), doc.reminderStatuteDate());
	addScraperJob(doc);

});

Projects.after.update(function(id, doc, fieldNames, modifier){
	addScraperJob(doc);
	doc = Projects._transform(doc);
})

// Projects.before.insert(function(id, doc){
// 	var shortId = Meteor.npmRequire('shortid');
// 	doc.uniqueId = Courts.findOne({_id: doc.courtId}).code+"-"+ shortId.generate();
// });

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
	Projects.direct.update( { _id: doc.caseId },{ $push: { hearingIds: doc._id } });

	//insert event
	var event_res = Events.insert({
		'hearingId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'hearings',
		'userIds' : [doc.lawyerId]
	});
	log.info('event_res',event_res);
	Hearings.direct.update( { _id: doc._id },{ $push: { eventIds: event_res } });
	Projects.direct.update( { _id: doc.caseId },{ $push: { eventIds: event_res } });

	var bill_res = Bills.insert({
					'hearingId' : doc._id,
					'type' : 'hearings',
					'paid' : false 
				});
	log.info('bill_res',bill_res);

	Hearings.direct.update( { _id: doc._id },{ $push: { billIds: bill_res } });
	Projects.direct.update( { _id: doc.caseId },{ $push: { billIds: bill_res } });

	// Reminders
	doc = Hearings._transform(doc);
	parseReminders(doc, 'hearings');
	// Add email reminder for hearing 1 week (7 days) before and 2 weeks (14 days) before
	addEmailReminder(doc, 'hearings', 'A hearing for your matter is due soon.', doc.project().clients().concat(doc.project().lawyers()), doc.lawyer().email, sprintf('[%s] Hearing for your matter: %s is due soon', doc.project()._id, doc.project().name), doc.reminderHearingDate(7));
	addEmailReminder(doc, 'hearings', 'A hearing for your matter is due soon.', doc.project().clients().concat(doc.project().lawyers()), doc.lawyer().email, sprintf('[%s] Hearing for your matter: %s is due soon', doc.project()._id, doc.project().name), doc.reminderHearingDate(14));
	
});

Hearings.after.update(function(id, doc, fieldNames, modifier){
	doc = Hearings._transform(doc);
	//debugger;
	if(doc.proceedings !== this.previous.proceedings)
		addEmailReminder(doc, 'hearings', 'Proceedings for your case have been updated.', doc.project().lawyers().concat(doc.project().clients()), doc.lawyer().email, sprintf('[%s] Proceedings for your matter: %s have been updated', doc.project()._id, doc.project().name));
	//log.info("after update: ", doc, fieldNames, modifier);
})

Hearings.after.remove( function( hearingId, doc){

	//...remove id from project:hearingIds
	Projects.direct.update( { _id : doc.projectId }, { $pull : { hearingIds : doc._id } } );

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
	//debugger;
	doc = Meetings._transform(doc);
	// add meeting to project
	Projects.direct.update( { _id: doc.caseId },{ $push: { meetingIds: doc._id } });

	// insert event
	var res = Events.insert({
		'meetingId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'meetings',
		'date' : doc.date,
		'userIds' : [userId]
	});

	Meetings.direct.update( { _id: doc._id },{ $push: { eventIds: res } });
	Projects.direct.update( { _id: doc.caseId },{ $push: { eventIds: res } });

	// Insert reminders
	parseReminders(doc, 'meetings');
	// Add reminder 1 day before meeting
	//doc = Meetings._transform(doc);
	parseReminders(doc, 'meetings');
	// Add email reminder before hearing date
});

Meetings.after.remove(function( meetingId, doc){

	//...remove ids from project
	Projects.direct.update( { _id: doc.caseId }, { $pull: { meetingIds: doc._id } } );

	 //...remove events
  	_.each(doc.eventIds,function(id){
  		Events.remove({_id : id});
  	});

});


//task hooks
Tasks.after.insert( function(userId, doc){
	doc = Tasks._transform(doc);
	//debugger;
	log.info('hook',doc);
	//add task to project
	Projects.direct.update( { _id: doc.caseId }, { $push: { taskIds: doc._id } } );

	// insert event
	var res = Events.insert({
		'taskId' : doc._id,
		'caseId' : doc.caseId,
		'type' : 'tasks',
		'date' : doc.date,
		'userIds' : doc.userIds
	});

	Tasks.direct.update( { _id: doc._id },{ $push: { eventIds: res } });
	Projects.direct.update( { _id: doc.caseId },{ $push: { eventIds: res } });

	// Insert reminder
	//doc = Tasks._transform(doc);
	parseReminders(doc, 'tasks');
	// Add email reminder before tasl deadline
	addEmailReminder(doc, 'tasks', 'A deadline for your task is appruaching soon', doc.lawyers(), doc.lawyers()[0].email, sprintf('[%s] A deadline for your task: %s is due soon', doc.project()._id, doc.desc), doc.deadline(2));
	addEmailReminder(doc, 'tasks', 'A deadline for your task is appruaching soon', doc.lawyers(), doc.lawyers()[0].email, sprintf('[%s] A deadline for your task: %s is due soon', doc.project()._id, doc.desc), doc.deadline(7));
});

Tasks.after.remove(function( taskId, doc){

	//...remove ids from project
	Projects.direct.update( { _id: doc.caseId }, { $pull: { taskIds: doc._id } } );

	 //...remove events
  	_.each(doc.eventIds,function(id){
  		Events.direct.remove({_id : id});
  	});

});

Timesheets.after.insert(function(id, doc){
	Projects.direct.update( { _id: doc.caseId },{ $push: { timesheetIds: doc._id } });
});

Timesheets.before.insert(function(id, doc){
	doc.userId = Meteor.userId();
});

Timesheets.after.remove(function(id, doc){
	Projects.direct.update( { _id: doc.caseId }, { $pull: { timesheetIds: doc._id } } );
});

// Remove a user from other groups before making it a member of the current group
Groups.before.insert(function(id, doc){
	removeUsersFromGroups(doc, false);
	if(doc.userIds)
		Roles.removeUsersFromRoles(doc.userIds, getAllRolesTags());
})

// On deleting a group, it's users permissions should be revoked
Groups.after.remove(function(id, doc){
	// Remove frmo all groups including itself
	removeUsersFromGroups(doc, true);
	Roles.removeUsersFromRoles(doc.userIds, getAllRolesTags());
});

// Update his roles to the docs' current role
Groups.after.insert(function(id, doc){
	Roles.addUsersToRoles(doc.userIds, doc.roles);
});

Groups.after.update(function(id, doc){
	// Reset everything
	removeUsersFromGroups(this.previous, false);
	if(this.previous.userIds)
		Roles.removeUsersFromRoles(this.previous.userIds, getAllRolesTags());

	if(doc.userIds)
		Roles.addUsersToRoles(doc.userIds, doc.roles);
});