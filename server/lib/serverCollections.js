Meteor.startuo(function(){
	gcmKey = new Mongo.Collection('keys');  //will return null on client

	if(!gcmKey.findOne()){
		gcmKey.insert({key: 'AIzaSyDduSSX8oxpi26NArsxRh0BzfCfg6phQp8'});
	}	
});
