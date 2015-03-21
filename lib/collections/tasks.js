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
	},
	'eventIds' : {
		optional : true,
		type : [String]
	},
	'completed' : {
		optional : true,
		type : Boolean
	}	 
});

Tasks = new Meteor.Collection('tasks');
Tasks.attachSchema(taskSchema);