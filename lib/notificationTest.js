
	var options={
			senderId : 373362830241,
			gcmAuthorization : gcmKey.findOne().key 
	};


	//Global to use from other files on server
	NotificationClient = new NotificationClient(options);
