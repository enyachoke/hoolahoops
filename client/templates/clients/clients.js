Template.clients.helpers({
	'clients' : function(){
		return Clients.find();
	}
});

Template.clients.events({
	'click #delete' :function(){
		Clients.remove(this._id);
	}
});