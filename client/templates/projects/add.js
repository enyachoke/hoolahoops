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

Template.projectAdd.events({
	'blur keypress .validate' : function (event, template) {
		debugger;
		if (!AutoForm.validateField('insertProjectForm',event.target.name) ){
			event.target.classList.add("invalid");
		}

		debugger;
	}
});

