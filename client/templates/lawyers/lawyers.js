Template.lawyers.helpers({
	'lawyers' : function(){
		return Meteor.users.find({type : 'lawyer'}); 
	}
});

Template.lawyerDetails.events({
	'click .delete' : function(e){
		Lawyers.remove(this._id);
		Router.go('lawyers');
	}
});