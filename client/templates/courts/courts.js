Template.courts.helpers({
	courts : function(){
		return Courts.find();
	}
});

Template.courts.events({
	'click .delete' : function(){
		Courts.remove(this._id);
	}
})