Template.hearingEdit.events({
    'click .editHearing': function (event){
      event.preventDefault();
      var currentId = this._id;
      var formJSON = $(event.target).closest("form").serializeJSON();
      Hearings.update(this._id, {$set: formJSON}, function(error){
        Router.go('hearingDetails', {_id: currentId});
      });
    },
    "change #attended_by_type select": function(evt) {
		  var newValue = $(evt.target).val();
		  Session.set("attended_by", newValue);
	}
});




Template.hearingEdit.helpers({

	'amount_by_type' : function(){
		//debugger;
		// var attended_by = Session.get("attended_by");
		// var amt;
		// if ( attended_by == 'Partner' ) {
		// 	amt = this.project.bill_hearing_partner;
		// }else if ( attended_by == 'Sr Associate' ) {
		// 	amt = this.project.bill_hearing_sr_associate;
		// }else if ( attended_by == 'Associate' ) {
		// 	amt = this.project.bill_hearing_associate;
		// }
		// Session.set('amount_by_type',amt);
		// return Session.get('amount_by_type');
		return this.bill_amt;
	}
});
