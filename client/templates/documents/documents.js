Template.docs.rendered = function(){
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');  // optional
	script.setAttribute('src', 'https://apis.google.com/js/api.js?onload=onApiLoad');
	document.getElementsByTagName('head')[0].appendChild(script);
	Meteor.call('getRootFolder',function(err,res){	
		if ( !err ){
			Session.set('rootFolder',res.result);
			var folderStack = [];
			folderStack.push(
				{
					id : res.result.id,
					title : res.result.title
				}
			);
			Session.set('folderStack', folderStack);
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
		Meteor.call('getFileById',event.target.id,function(err,res){
			Session.set('rootFolder',res.result);
			var stack = Session.get('folderStack');
			var folderStackIndex = -1;

			_.each(stack, function(folder, index){
				if ( folder.id == res.result.id ){
					folderStackIndex = index
				}
			})


			if ( folderStackIndex != -1 ){	
				stack.splice(folderStackIndex+1, stack.length - folderStackIndex - 1 );
				Session.set('folderStack', stack);
			}else{
				var stack = Session.get('folderStack');
				stack.push({
					id : res.result.id,
					title : res.result.title
				});
				Session.set('folderStack', stack);
			}
			
		});
	}
});

Template.docs.helpers({
	'getRootFolder' : function(){
		return Session.get('rootFolder');
	},
	'childrenFromRoot' : function() {
		if ( Session.get('rootFolder') != undefined ){
			Meteor.call('getFilesByFolderId',Session.get('rootFolder').id , function(err,res){
				Session.set('children',res);
			});
		}
		return Session.get('children');
	},
	'renderChildNode' : function()	{
		if ( this.result.mimeType == "application/vnd.google-apps.folder" ){
			//Session.set('rootFolder',this.result);
			return "<span  class=\"folder\" id=\""+this.result.id+"\">"+this.result.title+"</span>";
		}
		if ( this.result.mimeType == "application/vnd.google-apps.document"){
			return "<a href=\""+ this.result.alternateLink+"\">"+this.result.title+"</a>";
		}
	},
	'getFolderStack' : function(){	
		return Session.get('folderStack');
	},
	'renderStackLinks' : function(){
		return "<span  class=\"folder\" id=\""+this.id+"\">"+this.title+"</span>";
	} 
});
