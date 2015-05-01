SimpleSchema.debug = true


Accounts.config({
  forbidClientAccountCreation : false
});

if (Meteor.isClient){

    var scopes = ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/userinfo.email']
    Accounts.ui.config({
    	'requestPermissions':{'google':scopes},
    	'requestOfflineToken': {google: true},
    	'forceApprovalPrompt': {google: true}
    });

   
}

// Setup logging for client side

// TODO: Client side log helper compatibility
// TODO: Use a closure here
// TODO: Move this 
if(typeof log == "undefined") {
	log = {};
	log.info = function () {
	    var args = Array.prototype.slice.call(arguments, 0),
	        suffix = this.lineNumber ? 'line: '  + this.lineNumber : 'stack: ' + this.stack;

	    console.log.apply(console, args.concat([suffix]));
	};
	//debugger;
	log.error = log.auth = log.debug = log.warn = log.info;
}