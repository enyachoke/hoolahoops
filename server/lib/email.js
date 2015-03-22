addEmailReminders = function(doc, template) {
	_.each(doc.reminders, function(reminder){
		// TODO: Group emails by date to save mandrill bandwidth
		//TODO: Do this using iron router. Use a transform function here with collection helpers
		doc.url = Meteor.absoluteUrl() + template + '/' + doc._id;
		var merge_vars = toMandrillArray(doc);
		var job = myJobs.createJob('addEmail', {'name': 'Send Email', 'template': template, 'merge_vars': merge_vars, 'to': reminder.email});
		var delayMilliSeconds = Math.abs(reminder.date - new Date());
		job.retry({retries: 4, wait: 2*60*1000});
		job.delay(delayMilliSeconds);
		job.save();
	})
}