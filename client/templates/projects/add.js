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


Template.projectAdd.events({
	'blur .check_validation' : function (event, template) {	
		if (!AutoForm.validateField('insertProjectForm',event.target.name) ){
			event.target.classList.add("invalid");
		}else{
			event.target.classList.remove("invalid");
		}
	}
});


// TODO: Global function. Need to do something about it
populateReminders =  function(x) {
	//alert("yoyo");
	debugger;
}

// Template.projectAdd.rendered = function(){
// 	$(".selectize-input").selectize({
// 		render : {
// 			item: function( item ){
// 				return item+"asdf";
// 			}
// 		}
// 	});
// }

