SimpleSchema.debug = true


Accounts.config({
  forbidClientAccountCreation : false
});

if (Meteor.isClient){

    var scopes = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/userinfo.email']
    Accounts.ui.config({
    	'requestPermissions':{'google':scopes},
    	'requestOfflineToken': {google: true}
    });

   
}



