Template.hearingRow.events({
    'click .delete': function (event) {
		if(confirm("Confirm Delete?"))
			Meteor.call('removeHearing', this._id, function(err, result){
				if(result)
					Materialize.toast('Hearing Deleted!', 1500);
			})
    }
});

Template.hearingRow.helpers({
	'court' : function(){
		Session.set( 'project_title',Projects.findOne( {_id : this.caseId}).name );
		var court = Courts.findOne({_id : Projects.findOne({_id : this.caseId}).courtId});
		return court.name;
	},
	'title' : function(){
		return Projects.findOne({_id : this.caseId}).name;
	}
});

Template.hearingRow.rendered = function(){};