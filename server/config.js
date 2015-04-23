Meteor.startup(function() {
	// Mandrill config
    Meteor.Mandrill.config({
        username: "thegreatshasha@gmail.com",
        key: "2hd3_l9CBJE5Q-DR5QG5RA"
    });

    // Start the job queue
    myJobs.startJobs();

    Accounts.loginServiceConfiguration.remove({
	  service: "google"
	});

	Accounts.loginServiceConfiguration.insert({
	  service: "google",
	  clientId: "1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com",
	  secret: "GF3m9QmVZYKkAHbRgx_SASrz"
	});
    
    GOOGLE = Meteor.npmRequire('googleapis');
	OAUTH2 = GOOGLE.auth.OAuth2;
	CLIENT_ID = '1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com';
	CLIENT_SECRET = 'GF3m9QmVZYKkAHbRgx_SASrz';
	REDIRECT_URL = 'http://localhost:3000/documents';
	OAUTH2_CLIENT = new OAUTH2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
	SCOPES = [
		'https://www.googleapis.com/auth/plus.me',
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/drive'
	];
	DRIVE = GOOGLE.drive('v2');

	Kadira.connect('JuJNAjRAZr7Ag3wnf', 'f5e55ed4-9b38-447d-9812-be859f771c35')

	//create root folder
	// var shortId = Meteor.npmRequire('shortid');
	// var root_folder_title = shortId.generate();
	// if ( RootFolders.find().fetch().length == 0 ){
	// 	Meteor.call('insertFolder',root_folder_title,function(err,res){
	// 		console.log(err, res);
	// 		RootFolders.insert({title : root_folder_title, id : res.result.id})
 //    	});
	// }
    

});


