Template.hearingAdd.rendered = function(){
	$('.datepicker').pickadate({
	  });
}


Template.hearingAdd.events({
	"change #attended_by_type select": function(evt) {
		  var newValue = $(evt.target).val();
		  Session.set("attended_by", newValue);
	}	
});

Template.hearingAdd.helpers({

	'amount_by_type' : function(){
		 ;
		var attended_by = Session.get("attended_by");
		var amt;
		if ( attended_by == 'Partner' ) {
			amt = this.project.bill_hearing_partner;
		}else if ( attended_by == 'Sr Associate' ) {
			amt = this.project.bill_hearing_sr_associate;
		}else if ( attended_by == 'Associate' ) {
			amt = this.project.bill_hearing_associate;
		}
		Session.set('amount_by_type',amt);
		return Session.get('amount_by_type');
	},
	'pickadateOptions' : function(){
		// var disable = [];
		// debugger;
		// var lawyerId = AutoForm.getFieldValue('insertHearingForm','lawyerId');
		// if(lawyerId){
		// 	_.each(Events.find({ userIds : lawyerId, type : 'blocked' }).fetch(),function(event){
		// 		if( event && event.date){
		// 			disable.push(new Date(event.date))	;
		// 		}
		// 	});
		// 	console.log('returned array', disable);
			return {
				//disable : [new Date()],
				min: Session.get('min')
			}
		//}		
	}   
});
