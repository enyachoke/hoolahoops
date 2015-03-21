Meetings = new Meteor.Collection('meetings');

meetingSchema = new SimpleSchema({
	'date' : {
		type : Date,
		label : 'Date'
	},
	'caseId' : {
		type : String,
		label : 'case'
	},
	'minutes' : {
		type : String,
		label : 'minutes'
	},
	'eventIds' : {
		type : [String],
		optional : true
	}
});