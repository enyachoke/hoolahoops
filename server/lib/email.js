addEmailReminders = function(doc, template) {
	_.each(doc.reminders, function(reminder){
		// TODO: Group emails by date to save mandrill bandwidth
		var job = myJobs.createJob('addEmail', {'name': 'Send Email', 'template': template, 'merge_vars': toMandrillArray(doc), 'to': reminder.email});
		var delayMilliSeconds = Math.abs(reminder.date - new Date());
		job.retry({retries: 4, wait: 2*60*1000});
		job.delay(delayMilliSeconds);
		job.save();
	})
}