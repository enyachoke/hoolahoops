Template.docs.rendered = function(){
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');  // optional
	script.setAttribute('src', 'https://apis.google.com/js/api.js?onload=onApiLoad');
	document.getElementsByTagName('head')[0].appendChild(script);
	 ;
}

// Template.yo.helpers({
// 	'onApiLoad' : function(){
// 		 ;
// 	}
// })

Template.docs.events({
	'click #pick' : function(){
		//call loadGapi
		if (Session.get('gapiLoaded') == true )
		loadGapi();
	},
	'click #create' : function(event ,template){
		debugger;
	}
});

Template.docs.helpers({
	'getRootFolder' : function(){	
		Meteor.call('getRootFolder',function(err,res){	
			//rootFolder = res;
			Session.set('rootFolderId',res.result);
		});
		return Session.get('rootFolderId');
	},
	'childrenFromRoot' : function() {
		Meteor.call('getFilesByFolderId',Session.get('rootFolderId').id , function(err,res){
			Session.set('children',res);
		});
		return Session.get('children');
	}
});