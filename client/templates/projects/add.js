//TODO: Should this be here?
Template.hearingAdd.helpers({
	
	options : [
		{label: "Hearing", value: 0},
        {label: "Meeting", value: 1},
        {label: "Complaince Deadline", value: 2}
	],
	s2Opts: function() {
		return {placeholder: 'foo', tags: true};
	}
	
})

// TODO: Global function. Need to do something about it
populateReminders =  function(x) {
	//alert("yoyo");
	debugger;
}