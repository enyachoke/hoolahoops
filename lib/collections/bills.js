Bills = new Meteor.Collection('bills')
Bills.initEasySearch('title')

billSchema = new SimpleSchema ({
	hearingId : {
		optional : true,
		type : String
	},
	type : {
		optional : true,
		type : String
	},
	paid : {
		optional : true,
		type : Boolean
	}
});

Bills.attachSchema(billSchema);