Template.hearingRow.events({
    'click .delete': function (event) {
      Hearings.remove(this._id);
    }
});