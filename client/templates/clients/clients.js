Template.clientsList.helpers({
	'clients' : function(){
		debugger;
		return Users.find({type : 'client'})
	}
});

Template.clientsList.events({
	'click #delete' :function(){
		Materialize.toast('Client Deleted!', 1500);
		if(confirm("Confirm Delete?"))
			Users.remove(this._id);
	}
});

Template.clientDetails.events({
	'click .delete' :function(){
		Materialize.toast('Client Deleted!', 1500);
		if(confirm("Confirm Delete?")){
			Users.remove(this._id);
			Router.go('clientsList');
		}
	}
});

Template.clientRow.events({
	'click .row-clickable': function(event) {
		window.location.assign('/clients/' + this._id);
		event.stopPropagation();
	}
});
