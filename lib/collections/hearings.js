hearingSchema = new SimpleSchema({
	
	'date' : {
		type : Date,
		label : 'Date'
	},
	'caseId' : {
		type : String,
		label : 'case'
	}
	
});

Hearings = new Meteor.Collection('hearings');
Hearings.attachSchema(hearingSchema);