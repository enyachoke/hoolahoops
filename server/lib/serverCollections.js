Meteor.startup(function(){
	 //will return null on client

	if(!gcmKey.findOne()){
		gcmKey.insert({key: 'AIzaSyDduSSX8oxpi26NArsxRh0BzfCfg6phQp8'});
	}	
});
