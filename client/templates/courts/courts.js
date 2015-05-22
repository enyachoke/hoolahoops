Template.courts.helpers({
	courts : function(){
		return Courts.find();
	}
});

Template.courts.events({
	'click .delete' : function(){
		if(confirm("Confirm Delete?"))
			Courts.remove(this._id);
	}
})