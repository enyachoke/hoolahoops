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
