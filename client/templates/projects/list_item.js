// TODO: Move this out of here into joins or whatever
  Template.projectRow.helpers({
    'lawyers': function() {
      var post = this;
      console.log("inside post", this);
      var cursor = Meteor.users.find({_id: {$in:this.lawyerIds}});
      console.log(cursor.fetch());
      return cursor;
    },
    'clients': function() {
      var post = this;
      console.log("inside client helper", this);
      return Meteor.users.find({_id: {$in:this.clientIds}});
    },
    'court': function() {
      return Courts.findOne({_id: this.courtId});
    },
    'next_hearing' : function(){
      debugger;
      return Hearings.find({ date : {$gt : new Date()}},{ caseId : this._id}).fetch()[0].date.format('{dd}-{month}-{yy}');
    },
    'labels' : function(){
      debugger;
      return Labels.find({_id: {$in:this.labelIds}});
    }
  });
  
  Template.projectRow.events({
      'click .delete': function (event) {
        Projects.remove(this._id);
      }
  })