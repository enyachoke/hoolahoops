Timesheets = new Meteor.Collection('timesheets')
Timesheets.initEasySearch(['type', 'description'])

timesheetSchema = new SimpleSchema ({
	'duration' : {
		type : String,
		optional : true 				
	},
	'type' : {
		type : String,
		allowedValues: ['Conf', 'Drafting', 'Research', 'Court Hearing', 'Misc.'],
		optional : true
	},
	'caseId' : {
		type : String,
		label : 'case',
		optional : true
	},
	'userId' : {
		type : String,
		optional : true
	}
});

Timesheets.attachSchema(timesheetSchema);	