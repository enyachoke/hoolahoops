parseReminders = function(doc, template) {
	_.each(doc.reminders, function(reminder){
		// TODO: Group emails by date to save mandrill bandwidth
		//TODO: Do this using iron router. Use a transform function here with collection helpers
		addEmailReminder(doc, template, '', [reminder.email], reminder.date);
	})
}

addEmailReminder = function(doc, template, message, to, date) {
	//debugger;
	console.log("adding email reminder", message, to, date);
	// TODO: Faulty logic. Remove template from here and move this into helpers
	doc.linkurl = Meteor.absoluteUrl() + template + '/' + doc._id;
	doc.message = message
	var merge_vars = toMandrillArray(doc);
	console.log("addEmailReminder", merge_vars);
	var job = myJobs.createJob('addEmail', {'name': 'Send Email', 'template': template, 'merge_vars': merge_vars, 'to': to});
	var delayMilliSeconds = Math.max(0, date - new Date());
	console.log(delayMilliSeconds);
	job.retry({retries: 4, wait: 2*60*1000});
	job.delay(delayMilliSeconds);
	job.save();
}