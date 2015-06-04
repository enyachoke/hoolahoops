Teams = new Meteor.Collection('teams');

teamSchema = new SimpleSchema ({
	name : {
		type : String
	},
	userIds: {
		type: [String]
	}
});

Teams.attachSchema(teamSchema);