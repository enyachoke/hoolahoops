Template.clientsList.helpers({
	'clients' : function(){
		debugger;
		return Meteor.users.find({type : 'client'})
	}
});

Template.clientsList.events({
	'click #delete' :function(){
		Clients.remove(this._id);
	}
});

Template.clientDetails.events({
	'click .delete' :function(){
		Clients.remove(this._id);
		Router.go('clientsList');
	}
});