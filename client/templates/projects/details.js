// TODO: Really ugly code here. It's late and i'm tired. Copy pasting. Need to remove this asap. haha LOL
  Template.projectDetails.helpers({
	  
    'lawyers': function() {
      var post = this;
      console.log("inside post", this);
      var cursor = Lawyers.find({_id: {$in:this.lawyerIds}});
      console.log(cursor.fetch());
      return cursor;
    },
    'clients': function() {
      var post = this;
      console.log("inside client helper", this);
	  debugger;
      return Clients.find({_id: {$in:this.clientIds}});
    },
    'court': function() {
      return Courts.findOne({_id: this.courtId});
    },
	'feed' : function() {
		debugger;
		return Hearings.find({ 'caseId' : this.project._id });
	}
  });

  Template.projectDetails.events({
    'click .delete': function (event) {
      Projects.remove(this._id, function(){
        Router.go('projects');
      });
    }
  });