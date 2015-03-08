Template.hearingRow.events({
    'click .delete': function (event) {
      Hearings.remove(this._id);
    }
});

Template.hearingRow.helpers({
	'court' : function(){
		Session.set( 'project_title',Projects.findOne( {_id : this.caseId}).name );
		var court = Courts.findOne({_id : Projects.findOne({_id : this.caseId}).courtId});
		return court.name;
	},
	'title' : function(){
		return Session.get('project_title');
	}
});

Template.hearingRow.rendered = function(){};