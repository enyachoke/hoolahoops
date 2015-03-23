Meteor.methods({
	'getGoogleAuthUrl' : function(){
		// google = Meteor.npmRequire('googleapis');
		// OAuth2 = google.auth.OAuth2;
		// var CLIENT_ID = '1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com';
		// var CLIENT_SECRET = 'GF3m9QmVZYKkAHbRgx_SASrz';
		// var REDIRECT_URL = 'http://localhost:3000/googleauth';
		// oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
		// // https://www.googleapis.com/auth/drive
		// var scopes = [
		//   'https://www.googleapis.com/auth/plus.me',
		//   'https://www.googleapis.com/auth/calendar',
		//   'https://www.googleapis.com/auth/drive'
		// ];

		var url = OAUTH2_CLIENT.generateAuthUrl({
		  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
		  scope: SCOPES // If you only need one scope you can pass it as string
		});
		console.log('url :',url);
		return url;	
	},
	'getGoogleAuthToken' : function(code){
		// console.log(code);
		// var google = Meteor.npmRequire('googleapis');
		// var OAuth2 = google.auth.OAuth2;
		// var CLIENT_ID = '1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com';
		// var CLIENT_SECRET = 'GF3m9QmVZYKkAHbRgx_SASrz';
		// var REDIRECT_URL = 'http://localhost:3000/googleauth';
		//var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
		//var plus = google.plus('v1');
		

		var token = Async.runSync(function(done) {
        	OAUTH2_CLIENT.getToken(code, function(err, tokens) {
	  		// Now tokens contains an access_token and an optional refresh_token. Save them.
				if(!err) {
			    	OAUTH2_CLIENT.setCredentials(tokens);
			    	//debugger;
			    	// UserTokens.insert({
			    	// 	userId : 'rishabh.robben@gmail.com',
			    	// 	token : tokens
			    	// });
			    	console.log('token fetched',tokens);
			    	TOKENS = tokens;
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
		
		var drive = GOOGLE.drive('v2');
      	


      	// insertion example : create folder
  //     	var response_drive = Async.runSync(function(done) {
        	
		//  	// handle err and response
		// 	drive.files.insert({
		// 		resource: {
		// 		    title: 'A vs B',
		// 		    "mimeType": "application/vnd.google-apps.folder"    
		// 		},
		// 		// media: {
		// 		// 	"title": "pets123",
		// 		// 	mimeType: 'text/plain'
		// 		// },
		// 		auth: oauth2Client
		// 	}, function(err, response) {
		// 		console.log('error:', err, 'inserted:', response.id);
		// 		done(err, response.id);
		// 	});
		// });


    //   	// listing files
    //   	var response_list_req = Async.runSync(function(done){
    //   		drive.files.list({
    //   			'maxResults' : 20,
				// auth: oauth2Client
    //   		},function(err, response){
    //   			done(err, response);
    //   			console.log('files',err, response);
    //   		});
    //   	});
	
		//FETCH children
		var response_get_list = Async.runSync(function(done){
			drive.children.list({
				folderId: '0B8XNqOrM9GYOX1dWdVRleG1GbmM',
				auth: OAUTH2_CLIENT
			},function(err,res){
				done(err,res);
				console.log('list',err,res);
			});
		});

		

		//fetch file from id
		// var file_get_res = Async.runSync(function(done){
		// 	drive.files.get({
		// 		fileId: '1AcbV9LuRhEcve3OGsUm6oySJaOHeeJwWWjVLCkbbLcU',
		// 		auth: OAUTH2_CLIENT
		// 	},function(err,res){done(err,res)});
		// });

		// var response_list_req = Async.runSync(function(done){
  //     		drive.files.list({
  //     			'q' : 'pets',
		// 		auth: OAUTH2_CLIENT
  //     		},function(err, response){
  //     			done(err, response);
  //     			console.log('files',err, response);
  //     		});
  //     	});


		return response_get_list;

	},
	'getFolderId' : function(){
		//listing files
		OAUTH2_CLIENT.setCredentials(TOKENS);
		var drive = GOOGLE.drive('v2');
      	var response_list_req = Async.runSync(function(done){
      		drive.files.list({
      			maxResults : 5,
      			'q' : "title='pets'",
				auth: OAUTH2_CLIENT
      		},function(err, response){
      			done(err, response);
      			console.log('files',err, response);
      		});
      	});

		return response_list_req;
	},
	'insertFolder' : function (title){
		OAUTH2_CLIENT.setCredentials(TOKENS);
      	var response = Async.runSync(function(done) {
			DRIVE.files.insert({
				resource: {
				    title: title,
				    "mimeType": "application/vnd.google-apps.folder"    
				},
				auth: OAUTH2_CLIENT
			}, function(err, response) {
				console.log('error:', err, 'inserted:', response);
				done(err, response);
			});
		});

		return response;
	},
	'getFilesByFolderId' : function(folderId) {
		var items = [];
		OAUTH2_CLIENT.setCredentials(TOKENS);
		//FETCH children
		var response = Async.runSync(function(done){
			DRIVE.children.list({
				folderId: folderId,
				auth: OAUTH2_CLIENT
			},function(err,res){
				done(err,res);
				console.log('list',err,res);
			});
		});
		if (!response.error){
			response.result.items.forEach(function(item){
				item = Meteor.call('getFileById',item.id);
				items.push(item);
			});
		}
	
		return items;
	},
	'getFileById' : function(fileId){
		//fetch file from id
		OAUTH2_CLIENT.setCredentials(TOKENS);
		var response = Async.runSync(function(done){
			DRIVE.files.get({
				fileId: fileId,
				auth: OAUTH2_CLIENT
			},function(err,res){done(err,res)});
		});

		return response;
	}

});

