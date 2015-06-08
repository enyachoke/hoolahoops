

Template.hearingDetails.helpers({
    'hearings': function() {
      var post = this;
      console.log("inside client helper", this);
      //return Hearings.find({_id: {$in:this.clientIds}});
    },
	'court' : function(){
		Session.set('project_title',Projects.findOne({_id : this.caseId}).name);
		var court = Courts.findOne({_id : Projects.findOne({_id : this.caseId}).courtId});
		return court.name;
	},
	'title' : function(){
		return Projects.findOne({_id : this.caseId}).name;
	},
	'attorney' : function(){
		 ;
		return Meteor.users.findOne({_id: this.lawyerId});
	},
	'formatted_date' : function(){
		debugger;
		return this.date.format('{dd}-{month}-{yy}');
	}
});

Template.hearingDetails.rendered = function() {
};

Template.hearingDetails.events({
	'click .delete' : function(e){
		e.preventDefault();
		if(confirm("Confirm Delete?")){
			Materialize.toast('Hearing Deleted!', 1500);
			var caseId = this.caseId;
			Hearings.remove(this._id);
			Router.go( "/projects/"+caseId);
		}
	}
});