hearingSchema = new SimpleSchema({
	'title' : {
		type : 'string',
		optional : false,
		label : 'Title'
	},
	'date' : {
		type : 'Date',
		optional : false,
		label : 'Date'
	},
	'court' : {
		type : 'string',
		optional : false,
		label : 'Court'
	}
	
});

Hearings = new Meteor.Collection('hearings');
Hearings.attachSchema(hearingSchema);