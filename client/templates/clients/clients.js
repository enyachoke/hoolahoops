Template.clientsList.helpers({
	'clients' : function(){
		return Clients.find();
	}
});

Template.clientsList.events({
	'click #delete' :function(){
		Clients.remove(this._id);
	}
});