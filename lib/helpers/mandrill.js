/* Mandrill helper needed in both client and server */
transformUserForMandrill = function(user) {
	return {
		'name': user.name,
		'email': user.emails[0].address
	};
}