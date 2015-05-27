Template.clientsList.helpers({
	'clients' : function(){
		debugger;
		return Users.find({type : 'client'})
	}
});

Template.clientsList.events({
	'click #delete' :function(){
		if(confirm("Confirm Delete?"))
			Meteor.call('removeClient', this._id, function(err, result){
				if(result)
					Materialize.toast('Client Deleted!', 1500);
			})
	}
});

Template.clientDetails.events({
	'click .delete' :function(){
		if(confirm("Confirm Delete?"))
			Meteor.call('removeClient', this._id, function(err, result){
				if(result)
					Router.go('clientsList');
			})
	}
});