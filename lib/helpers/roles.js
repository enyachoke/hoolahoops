/* Checks if user has a role string of the format [view-resource] where resource can be like projects, hearings etc */
canAccessUrl = function (url, user) {
	var resource = urlToResource(url);
	var role = "view-" + resource;
	return Roles.userIsInRole(Meteor.user(), role);
}

/* Convert url to resource. eg: /projects returns projects */
urlToResource = function (url) {
	return url.split("/")[1];
}

getAllRolesTags = function() {
	// var roles = Roles.getAllRoles().fetch();
	var roles = [
		'view-projects','edit-projects',
		'view-bills', 'edit-bills',
		'view-courts', 'edit-courts',
		'view-hearings', 'edit-hearings',
		'view-labels', 'edit-labels',
		'view-clients', 'edit-clients',
		'view-lawyers', 'edit-lawyers',
		'view-groups', 'edit-groups',
		'view-calendars', 'edit-calendars'
	];
	// return roles.map(
	// 	function(el){
	// 		return el.name
	// 	}
	// ;)
	return roles;
}