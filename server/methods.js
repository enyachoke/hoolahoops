Meteor.methods({
	'getGoogleAuthToken' : function(){
		var google = Meteor.npmRequire('googleapis');
		var OAuth2 = google.auth.OAuth2;
		var CLIENT_ID = '1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com';
		var CLIENT_SECRET = 'GF3m9QmVZYKkAHbRgx_SASrz';
		var REDIRECT_URL = 'http://localhost:3000';
		var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
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

		return url;	
	}
});