Meetings = new Meteor.Collection('meetings');

meetingSchema = new SimpleSchema({
	'date': {
		type: Date,
		label: 'Date'
	},
	'caseId': {
		type: String,
		label: 'case'
	},
	'minutes': {
		type: String,
		label: 'minutes'
	},
	'eventIds': {
		type: [String],
		optional: true
	},
	'agenda': {
		type: String,
		optional: true
	},
	reminders: {
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