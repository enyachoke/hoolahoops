Template.groupEdit.helpers({
	formId: function() {
		return "groupEdit" + this._id;
	}
});

Template.groupEdit.events({
	'click .delete': function (event) {
		if (confirm("Confirm Delete?"))
			Meteor.call('removeGroup', this._id, function(err, result){
				if(result)
					Materialize.toast('Group Deleted!', 1500);
			})
	}
})