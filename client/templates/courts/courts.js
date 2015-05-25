Template.courts.helpers({
	courts : function(){
		return Courts.find();
	}
});

Template.courts.events({
	'click .delete' : function(){
		if(confirm("Confirm Delete?")) {
			Materialize.toast('Court Deleted!', 1500);
			Courts.remove(this._id);
		}
	}
})