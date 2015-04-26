getUsers = function(options){
	return Meteor.users.find.apply(Meteor.users, options);
}

getUserOptions = function(){
	var options = [];
	//var lawyers = [];
	//console.log(this, this.lawyerIds);
	var opts = [
		{},
		{transform: transformUserForMandrill}
	];

	var users = getUsers(opts).fetch();
	_.each(users, function(element){
	  options.push({
	    label: element.name,
	    value: element.email
	  });
	});
	// debugger;
	return options;
}