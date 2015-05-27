Template.courts.helpers({
	courts : function(){
		return Courts.find();
	}
});

Template.courts.events({
	'click .delete' : function(){
		if(confirm("Confirm Delete?"))
			Meteor.call('removeCourt', this._id, function(err, result){
				if(result)
					Materialize.toast('Court Deleted!', 1500);
			})
	}
})