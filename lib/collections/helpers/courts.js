getCourts = function(options){
	return Courts.find.apply(Courts, options);
}

getCourtOptions = function(opts){
	return function() {
		var options = [];
		
		var courts = getCourts([opts]).fetch();
		_.each(courts, function(element){
		  options.push({
		    label: element.name,
		    value: element._id
		  });	
		});
		return options;	
	}	
}