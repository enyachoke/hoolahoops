Teams = new Meteor.Collection('teams');

teamSchema = new SimpleSchema ({
	name : {
		type : String
	}
});

Teams.attachSchema(teamSchema);