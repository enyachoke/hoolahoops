Template.hearingDetails.helpers({
    'hearings': function() {
      var post = this;
      console.log("inside client helper", this);
      //return Hearings.find({_id: {$in:this.clientIds}});
    }
});