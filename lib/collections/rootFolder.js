RootFolders = new Meteor.Collection('rootFolders');

rootFoldersSchema = new SimpleSchema({
	title :{
		type : String
	},
	id : {
		type : String
	}	
});

RootFolders.attachSchema(rootFoldersSchema);