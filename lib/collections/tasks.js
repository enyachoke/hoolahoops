taskSchema = new SimpleSchema({
	'date': {
		type: Date,
		label: 'Deadline'
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
			options: function() {
				var options = [];
				var lawyers = Lawyers.find().fetch();
				_.each(lawyers, function(element) {
					options.push({
						label: element.name,
						value: element.email
					});
				});
				return options;
			}
		}
	}
});

Tasks = new Meteor.Collection('tasks');
Tasks.attachSchema(taskSchema);