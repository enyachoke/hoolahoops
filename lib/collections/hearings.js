hearingSchema = new SimpleSchema({
	
	'date' : {
		type : Date,
		label : 'Date'
	},
	'caseId' : {
		type : String,
		label : 'case'
	},
	'proceedings' : {
		optional : true,
		type : String,
		label : 'Summary'		
	},
	'judge' : {
		optional : true,
		type : String,
		label : 'Judge'	
	},
	'lawyerId' : {
		optional : true,
		type : String,
		label : 'Attorney'
	},
	'bill_amt' : {
		optional : true,
		type : Number,
		label : 'Bill Amount'
	},
	'reminders' : {
		optional : true,
		type : String
	},
	'attendedBy' : {
		optional : true,
		type : String,
		label : 'Attended By',
		allowedValues: ['Partner','Sr Associate','Associate']
	},
	'eventIds' : {
		optional : true,
		type : [String]
	},
	'billIds' : {
		optional : true,
		type : [String]
	}	
});

Hearings = new Meteor.Collection('hearings');
Hearings.attachSchema(hearingSchema);

//
// proceedings-
// judge-
// attorney-
// date, time
// court, court room
// misc comments
// billing details