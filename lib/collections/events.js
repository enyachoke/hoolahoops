Events = new Meteor.Collection('events')

eventSchema = new SimpleSchema({
		'date' : {
			type: Date
		},
		'type' : {
			type : String
		},
		'hearingId' : {
			type: String,
			optional : true
		},
		'caseId' : {
			type: String,
			optional : true
		},
		'meetingId' : {
			type : String,
			optional : true
		},
		'userIds' : {
			type : [String],
			opional : true
		}
	});

Events.attachSchema(eventSchema);