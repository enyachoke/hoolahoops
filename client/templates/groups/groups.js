Template.groupEdit.helpers({
	formId: function() {
		return "groupEdit" + this._id;
	}
});

Template.groupEdit.events({
	'click .delete': function (event) {
		Groups.remove(this._id);
	}
})