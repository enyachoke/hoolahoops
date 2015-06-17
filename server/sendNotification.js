var data = {
	title: 'testing Notifications',
	message: 'can you see me?'
};

Meteor.setInterval(function(){
	NotificationClient.sendNotification(Meteor.users.find(), data);
},3000);


