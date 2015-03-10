Timesheets = new Meteor.Collection('timesheets')

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
	}
});