Template.hearingEdit.events({
    'click .editHearing': function (event){
      event.preventDefault();
      var currentId = this._id;
      var formJSON = $(event.target).closest("form").serializeJSON();
      Hearings.update(this._id, {$set: formJSON}, function(error){
        Router.go('hearingDetails', {_id: currentId});
      });
    }
  })