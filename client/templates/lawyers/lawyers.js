Template.lawyers.helpers({
	'lawyers' : function(){
		return Lawyers.find(); 
	}
});

Template.lawyerDetails.events({
	'click .delete' : function(e){
		Lawyers.remove(this._id);
		Router.go('lawyers');
	}
});