Template.lawyers.helpers({
	'lawyers' : function(){
		debugger;
		return Meteor.users.find({type : 'lawyer'}); 
	}
});

Template.lawyerDetails.events({
	'click .delete' : function(e){
		if(confirm("Confirm Delete?")) {
			Lawyers.remove(this._id);
			Router.go('lawyers');
		}
	}
});