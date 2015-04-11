Template.docs.rendered = function(){
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');  // optional
	script.setAttribute('src', 'https://apis.google.com/js/api.js?onload=onApiLoad');
	document.getElementsByTagName('head')[0].appendChild(script);

	Session.set('rootLoaded',false);
	Session.set('childrenLoaded',false);

	Meteor.call('getRootFolder',{ userId : Meteor.userId() },function(err,res){	
		//debugger;
		if ( !res.error ){
			
			var folderStack = [];
			folderStack.push(
				{
					id : res.result.id,
					title : res.result.title
				}
			);
			Session.set('folderStack', folderStack);
			Session.set('rootFolder',res.result);
			Session.set('rootLoaded',true);

			if ( Session.get('rootFolder') != undefined ){

					Meteor.call('getFilesByFolderId', {

					    userId : Meteor.userId(),
					    folderId : Session.get('rootFolder').id 

					}, function(err,res){
						if ( !res.error){
							
							Session.set('children',res);
							Session.set('childrenLoaded',true);
						}
						
					});
			}

		}
	});
}

Template.docs.events({
	'click #pick' : function(){
		//call loadGapi
		if (Session.get('gapiLoaded') == true )
		loadGapi();

	},
	'click #create' : function(event ,template){
	},
	'click .folder' : function ( event, template){
		//debugger;	
		var id = event.target.id;
		var stack = Session.get('folderStack');
		var folderStackIndex = -1;

		Session.set('rootLoaded',false);
		Session.set('childrenLoaded',false);
		Meteor.call('getFileById',{
		    userId : Meteor.userId(),
		    fileId : id
		},function(err,res){

//			debugger;

			if (! res.error){
				Session.set('rootFolder',res.result);
				Session.set('rootLoaded',true);
				_.each(stack, function(folder, index){

					if ( folder.id == res.result.id ){

						folderStackIndex = index

					}
				})
				if ( folderStackIndex != -1 ){	

					stack.splice(folderStackIndex+1, stack.length - folderStackIndex - 1 );
					Session.set('folderStack', stack);

				}else{

					stack.push({
						id : res.result.id,
						title : res.result.title
					});

					Session.set('folderStack', stack);
				}


				if ( Session.get('rootFolder') != undefined ){

					Meteor.call('getFilesByFolderId', {

					    userId : Meteor.userId(),
					    folderId : Session.get('rootFolder').id 

					}, function(err,res){
						if ( !res.error){
							
							Session.set('children',res);
							Session.set('childrenLoaded',true);
						}
						
					});
				}
				
			}			
		});
	}
});

Template.docs.helpers({
	'getRootFolder' : function(){

		return Session.get('rootFolder');

	},
	'childrenFromRoot' : function() {
		return Session.get('children');
	},
	'isFolder' : function(){
		return this.result.mimeType == "application/vnd.google-apps.folder"
	},
	'getFolderStack' : function(){	
		return Session.get('folderStack');

	},
	'showLoader' : function(){
		//console.log(' show loader', ( !Session.get('childrenLoaded') || !Session.get('rootLoaded') ) );
		return (  !Session.get('childrenLoaded') || !Session.get('rootLoaded')  );

	}
});