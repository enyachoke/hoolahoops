demoSchema = new SimpleSchema({
	'name' : {
		type: String,
		optional : true,
		label : 'Name'
	}
});

Demos = new Meteor.Collection('demos')

Demos.attachSchema(demoSchema);