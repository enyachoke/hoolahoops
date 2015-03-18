Meteor.methods({
	'getGoogleAuthUrl' : function(){
		 google = Meteor.npmRequire('googleapis');
		 OAuth2 = google.auth.OAuth2;
		var CLIENT_ID = '1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com';
		var CLIENT_SECRET = 'GF3m9QmVZYKkAHbRgx_SASrz';
		var REDIRECT_URL = 'http://localhost:3000/googleauth';
		 oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
		https://www.googleapis.com/auth/drive
		var scopes = [
		  'https://www.googleapis.com/auth/plus.me',
		  'https://www.googleapis.com/auth/calendar',
		  'https://www.googleapis.com/auth/drive'
		];

		var url = oauth2Client.generateAuthUrl({
		  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
		  scope: scopes // If you only need one scope you can pass it as string
		});
		console.log('url :',url);
		return url;	
	},
	'getGoogleAuthToken' : function(code){
		console.log(code);
		var google = Meteor.npmRequire('googleapis');
		var OAuth2 = google.auth.OAuth2;
		var CLIENT_ID = '1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com';
		var CLIENT_SECRET = 'GF3m9QmVZYKkAHbRgx_SASrz';
		var REDIRECT_URL = 'http://localhost:3000/googleauth';
		var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
		var plus = google.plus('v1');
		

		var token = Async.runSync(function(done) {
        	oauth2Client.getToken(code, function(err, tokens) {
	  		// Now tokens contains an access_token and an optional refresh_token. Save them.
				if(!err) {
			    	oauth2Client.setCredentials(tokens);
			    	console.log('token fetched',tokens);
			    	done(err,tokens);
				}
			});
      	});

		// var response = Async.runSync(function(done) {
  //       	plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, data) {
		//  	// handle err and response
		//  		console.log(err, data);
		//  		done(null, data);
		//  		console.log("asdfasdf",data);
		// 	});
  //     	});
		

		var drive = google.drive('v2');
      	


      	// insertion example : create folder
      	var response_drive = Async.runSync(function(done) {
        	
		 	// handle err and response
			drive.files.insert({
				resource: {
				    title: 'pets',
				    "mimeType": "application/vnd.google-apps.folder"    
				},
				media: {
					"title": "pets123",
					mimeType: 'text/plain'
				},
				auth: oauth2Client
			}, function(err, response) {
				console.log('error:', err, 'inserted:', response.id);
				done(err, response.id);
			});
		});


      	// listing files
      	var response_list_req = Async.runSync(function(done){
      		drive.files.list({
      			'maxResults' : 20,
				auth: oauth2Client
      		},function(err, response){
      			done(err, response);
      			console.log('files',err, response);
      		});
      	});

		return response_drive;

	}
});

