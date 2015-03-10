// TODO: Move this out of here into joins or whatever
  Template.projectRow.helpers({
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
      return Clients.find({_id: {$in:this.clientIds}});
    },
    'court': function() {
      return Courts.findOne({_id: this.courtId});
    }
  });
  
  Template.projectRow.events({
      'click .delete': function (event) {
        Projects.remove(this._id);
      }
  })