Accounts.onLogin(function(){
	//create root folder
	var root_folder_title = "cloudVakil";//Random.id();
	Meteor.call('getRootFolderId',	function(err,res){
		if ( res == undefined ){
			debugger;
			Meteor.call('insertFolder',{ title: root_folder_title, userId: Meteor.userId() },function(err,res){
				console.log(err, res, 'rootFolderCreated');
				debugger;
				RootFolders.insert({title : root_folder_title, id : res.result.id});			
	    	});
		}
	})	
});

Users = Meteor.users;

Meteor.startup(function(){
    	var scopes = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/userinfo.email']
	    Accounts.ui.config({
	    	'requestPermissions':{'google':scopes},
	    	'requestOfflineToken': {google: true},
	    	'forceApprovalPrompt': {google: true}
	    });
});