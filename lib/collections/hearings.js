hearingSchema = new SimpleSchema({
	'title' : {
		type : String,
		optional : false,
		label : 'Title'
	},
	'date' : {
		type : Date,
		optional : false,
		label : 'Date'
	},
	'court' : {
		type : String,
		optional : false,
		label : 'Court'
	},
	'type' : {
		type : String,
		label : 'event type'
	}
	
});

Hearings = new Meteor.Collection('hearings');
Hearings.attachSchema(hearingSchema);