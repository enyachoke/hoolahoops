Bills = new Meteor.Collection('bills')

billSchema = new SimpleSchema ({
	hearingId : {
		optional : true,
		type : String
	},
	type :{
		optional : true,
		type : String
	}
});

Bills.attachSchema(billSchema);