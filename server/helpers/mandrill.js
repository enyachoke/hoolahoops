toMandrillArray = function(obj) {
	var arr = [];

	for(var key in obj) {
		if(obj.hasOwnProperty(key)) {
			arr.push({name: key,content: obj[key]});	
		}
	};

	return arr;
}