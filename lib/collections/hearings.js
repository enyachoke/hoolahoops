hearingSchema = new SimpleSchema({
	
	'date' : {
		type : Date,
		label : 'Date'
	},
	'type' : {
		type : String,
		label : 'event type'
	},
	'caseId' : {
		type : String,
		label : 'case'
	}
	
});

Hearings = new Meteor.Collection('hearings');
Hearings.attachSchema(hearingSchema);