Template.lawyers.helpers({
	'lawyers' : function(){
		debugger;
		return Meteor.users.find({type : 'lawyer'});
	}
});

Template.lawyerDetails.events({
	'click .delete': function(e){
		e.preventDefault();
		Lawyers.remove(this._id);
		Router.go('lawyers');
	}
});
