gcmKey = new Mongo.Collection('keys'); 
	

	var keyDoc= gcmKey.findOne();
	var key;
	if(keyDoc)
		key= keyDoc.key;
	else
		key= null;

	var options={
			senderId : 373362830241,
			gcmAuthorization :  key
	};


	//Global to use from other files on server
	NotificationClient = new NotificationClient(options);
