taskSchema = new SimpleSchema({
	'date' : {
		type : Date,
		label : 'Deadline'
	},
	'desc' : {
		type : String,
		label : 'Description'
	},
	'caseId' : {
		type : String,
		label : 'case'
	}	 
});

Tasks = new Meteor.Collection('tasks');
Tasks.attachSchema(taskSchema);