Template.lawyers.helpers({
	'lawyers' : function(){
		debugger;
		return Meteor.users.find({type : 'lawyer'}); 
	}
});

Template.lawyerDetails.events({
	'click .delete' : function(e){
		if(confirm("Confirm Delete?"))
			Meteor.call('removeLawyer', this._id, function(err, result){
				if(result)
					Router.go('lawyers');
			})
	}
});