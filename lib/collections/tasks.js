taskSchema = new SimpleSchema({
	'date': {
		type: Date,
		label: 'Deadline',
		autoform: {
	      	type : "pickadate"  	
	    }
	},
	'desc': {
		type: String,
		label: 'Description'
	},
	'caseId': {
		type: String,
		label: 'case'
	},
	'eventIds': {
		optional: true,
		type: [String]
	},
	'completed': {
		optional: true,
		type: Boolean
	},
	'reminders': {
		type: [Object],
		optional: true
	},
	"reminders.$.date": {
		type: Date,
		autoform: {
			type: 'datetime-local'
		}
	},
	"reminders.$.email": {
		type: String,
		autoform: {
			type: "selectize",
			options: getUserOptions
		}
	},
	'userIds': {
	    optional: true,
	    type: [String],
	    label: 'Lawyers'
  	}
});

Tasks = new Meteor.Collection('tasks');
Tasks.attachSchema(taskSchema);