/* Mandrill helper needed in both client and server */
transformUserForMandrill = function(user) {
	return {
		'name': user.profile.name,
		'email': user.username,
		'type': 'cc'
	};
}