// Project hooks
Projects.after.insert(function(projectId, doc){
	_.each(doc.reminders, function(reminder){
		var job = myJobs.createJob('addDemo', {'name': 'Send Email', 'template': 'standard', 'merge_vars': toMandrillArray(doc)});
		var delayMilliSeconds = Math.abs(reminder.date - new Date());
		job.retry({retries: 4, wait: 2*60*1000});
		job.delay(delayMilliSeconds);
		job.save();
	})
});

// Projects.after.insert(function(projectId, doc){
// 	Router.go('/projects/' + projectId);
// })