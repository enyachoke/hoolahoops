Events = new Meteor.Collection('events')

// TODO: Quickly add teamId and schema here
eventSchema = new SimpleSchema({
		'teamId': {
		    type: String,
		    autoValue: setTeamId
	  	},
		'date' : {
			type: Date,
			optional : true
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
		'taskId' : {
			type : String,
			optional : true
		},
		'userIds' : {
			type : [String],
			optional : true
		}
	});

Events.attachSchema(eventSchema);