toMandrillArray = function(obj) {
	var arr = [];

	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			arr.push({name: key,content: obj[key]});	
		}
	};

	return arr;
}

transformUserForMandrill = function(user) {
	return {
		'name': user.name,
		'email': user.emails[0].address
	};
}