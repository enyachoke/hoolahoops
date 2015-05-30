Template.groupEdit.helpers({
	formId: function() {
		return "groupEdit" + this._id;
	}
});

Template.groupEdit.events({
	'click .delete': function (event) {
		if (confirm("Confirm Delete?")){
			Materialize.toast('Group Deleted!', 1500);
			Groups.remove(this._id);
		}
	}
})