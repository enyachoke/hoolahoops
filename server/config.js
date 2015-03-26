Meteor.startup(function() {
	// Mandrill config
    Meteor.Mandrill.config({
        username: "thegreatshasha@gmail.com",
        key: "2hd3_l9CBJE5Q-DR5QG5RA"
    });

    // Start the job queue
    myJobs.startJobs();

	 // // Start the job queue
    // myJobs.startJobs();
    var test = "5";
    function test123(){
    	return '123';
    }

    //create folder 

    






    TOKENS = {
    	access_token: "ya29.QQGam3MunI93TlIPbbIdk4S1sMiYRujtRXuOK48JaOaACd1y7Y-XSzDpM54bO6briQq4YOOAZAmzmQ",
		expiry_date: 1427290202608,
		id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE1MmY1OTkxYzMxY2ZmMzZhMDlhNTA1MDdkMWMwOTZiZmMwM2RjMjIifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwic3ViIjoiMTEyNTY2NjkyMTc3ODA0MDI5NTgwIiwiYXpwIjoiMTA0MjUyNjQ3OTM5MS1tNm4wZG1jOTdlMGM4NGp1Y2o1Z3N1MTNxdG1mNGRvOS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF0X2hhc2giOiJmYXZ0d0hKd2xBVTVKbUhYWS1WSWJRIiwiYXVkIjoiMTA0MjUyNjQ3OTM5MS1tNm4wZG1jOTdlMGM4NGp1Y2o1Z3N1MTNxdG1mNGRvOS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImlhdCI6MTQyNzI4NjQyMiwiZXhwIjoxNDI3MjkwMjAyfQ.AXIAbChXX748njwWsXvoRSWRI7qEYFZUgcJ3nq3azA_XQZfgiYF-59LS4i3GKh-oyyyi3ubmDtuqWWv5bTTqi8YiLtXIvzeQiUswearY4vXgq_UkdlM2b0kzDqx5-qqTCRREBTex8MdVsZN9qYPTvFqpWSY2gWxv6f1tfUiTDGs"
		,refresh_token: "1/5QGivqaCWt6BRU8g7Z3DHAI0uZuH0NcP24St8ScOaTMMEudVrK5jSpoR30zcRFq6",
		token_type: "Bearer"
    };
    
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

	Kadira.connect('JuJNAjRAZr7Ag3wnf', 'f5e55ed4-9b38-447d-9812-be859f771c35')


	//create root folder
	var shortId = Meteor.npmRequire('shortid');
	var root_folder_title = shortId.generate();
	if ( RootFolders.find().fetch().length == 0 ){
		Meteor.call('insertFolder',root_folder_title,function(err,res){
			console.log(err, res);
			debugger;
			RootFolders.insert({title : root_folder_title, id : res.result.id})
    	});
	}
    

});


