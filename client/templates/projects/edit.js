Template.projectEdit.events({
    'click .editProj': function (event){
      event.preventDefault();
      var currentId = this._id;
      var formJSON = $(event.target).closest("form").serializeJSON();
      Projects.update(this._id, {$set: formJSON}, function(error){
        Router.go('projectDetails', {_id: currentId});
      });
    }
  })