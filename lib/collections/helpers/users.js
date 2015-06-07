getUsers = function(options){
	return Meteor.users.find.apply(Meteor.users, options);
}

getUserOptions = function(opts, el){
	var options = [];
	//var lawyers = [];
	//log.info(this, this.lawyerIds);
	var users = getUsers([opts, {transform: transformUserForMandrill}]).fetch();

	debugger;
	_.each(users, function(element){
	  options.push({
	    label: element[el.labelKey],
	    value: element[el.valueKey]
	  });
	});
	// debugger;
	return options;
}