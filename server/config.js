Meteor.startup(function() {
	// Mandrill config
    // Meteor.Mandrill.config({
    //     username: "thegreatshasha@gmail.com",
    //     key: "2hd3_l9CBJE5Q-DR5QG5RA"
    // });

    // // Start the job queue
    // myJobs.startJobs();
    var test = "5";
    function test123(){
    	return '123';
    }



    TOKENS = { access_token: 'ya29.OwGtQG1UbLyiBs0ei_YXvDoysM-YEhelqJsMlenhcbQUw0SqJkLbZsNtdXEB5hsxkjOd3VASFR7fTQ',
token_type: 'Bearer',
id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjliZDA3Mzc5MjMyYjAyMmMxNWI4OTg3YjU0ZDc5OGRhNGFhMmQwOWIifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwic3ViIjoiMTEyNTY2NjkyMTc3ODA0MDI5NTgwIiwiYXpwIjoiMTA0MjUyNjQ3OTM5MS1tNm4wZG1jOTdlMGM4NGp1Y2o1Z3N1MTNxdG1mNGRvOS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF0X2hhc2giOiJ1Qk5sR2h0QmMwMWpzMWtSdXh4VFR3IiwiYXVkIjoiMTA0MjUyNjQ3OTM5MS1tNm4wZG1jOTdlMGM4NGp1Y2o1Z3N1MTNxdG1mNGRvOS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImlhdCI6MTQyNjc4MzczMywiZXhwIjoxNDI2Nzg3NTEzfQ.sJVWpOzyxowtk8AGhPxTjFU9NRfc35aC6Zf5FsMPlaES9hPhFe4o-R6SWgrBgh-L2L71WmnXpGesgzHxgZaC-MayxqHuse5TSAVuXuLRUz9hd3Ge9c200qdNlKpGjKvHYpJwbYhV6cMuwq7GI4AUKFTKZVlnJmLUhb49oYNxl6M',
expiry_date: 1426787511725 };
    GOOGLE = Meteor.npmRequire('googleapis');
	OAUTH2 = GOOGLE.auth.OAuth2;
	CLIENT_ID = '1042526479391-m6n0dmc97e0c84jucj5gsu13qtmf4do9.apps.googleusercontent.com';
	CLIENT_SECRET = 'GF3m9QmVZYKkAHbRgx_SASrz';
	REDIRECT_URL = 'http://localhost:3000/googleauth';
	OAUTH2_CLIENT = new OAUTH2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
	SCOPES = [
		'https://www.googleapis.com/auth/plus.me',
		'https://www.googleapis.com/auth/calendar',
		'https://www.googleapis.com/auth/drive'
	];
	DRIVE = GOOGLE.drive('v2');


});