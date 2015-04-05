Meetings = new Meteor.Collection('meetings');

meetingSchema = new SimpleSchema({
	'date': {
	    type: Date,
	    autoform: {
	      	type : "pickadate"
	    }
	},
	'caseId': {
		type: String,
		label: 'case'
	},
	'minutes': {
		type: String,
		label: 'minutes'
	},
	'eventIds': {
		type: [String],
		optional: true
	},
	'agenda': {
		type: String,
		optional: true
	},
	reminders: {
		type: [Object],
		optional: true
	},
	"reminders.$.date": {
		type: Date,
		autoform: {
			type: 'datetime-local'
		}
	},
	"reminders.$.email": {
		type: String,
		autoform: {
			type: "selectize",
			options: function() {
				var options = [];
				var lawyers = Lawyers.find().fetch();
				_.each(lawyers, function(element) {
					options.push({
						label: element.name,
						value: element.email
					});
				});
				return options;
			}
		}
	},
	startHour : {
		type : Number,
		optional : true,
		//allowedValues: ['1', '2', '3'],
		autoform: {
      		options: function(){
      			opts = []
      			for ( var i=1 ; i <25 ; i++) {
      				opts.push({
      					label : i,
      					value : i
      				});
      			}
      			debugger;
      			var date = AutoForm.getFieldValue("insertMeetingForm", "date")
      			if( date && date != ""){
      				console.log("yo",date);
      				meetings_today = Meetings.find({date : date}).fetch();
      				_.each(meetings_today,function(meeting){
      					for ( var i = meeting.startHour; i<meeting.endHour ; i++){
      						opts.remove({ label:i, value:i });
      					}
      				})
      			}
      			Session.set('meeting_slot_options',opts);
      			return opts;
      		}

      	}
	},
	endHour : {
		type : Number,
		optional : true,
		autoform: {
      		options: function(){
      			opts = [];
      			var startHour = AutoForm.getFieldValue("insertMeetingForm", "startHour") ;
      			if ( startHour ){
	      			var spliceTill ;
	      			opts = []
	      			for ( var i=1 ; i <25 ; i++) {
	      				opts.push({
	      					label : i,
	      					value : i
	      				});
	      			}
	      			
	      			
	      			var date = AutoForm.getFieldValue("insertMeetingForm", "date")
	      	 	
	      	 		opts.splice( 0,startHour );

	      	 		if( date && date != "") {

	      	 			var meetings_today = Meetings.find({date : date}).fetch();
		      	 		_.each(meetings_today, function(meeting){

		      	 			if ( meeting.startHour > startHour ) {

		      	 				_.each(opts,function(opt,key){

		      	 					if (opt.value == meeting.startHour) {
		      	 						opts = opts.splice(0, key+1);
		      	 					}

		      	 				});
		      	 				
		      	 				
		      	 			}
		      	 		});
	      	 		}	
	      	 	}
	      	 	return opts;
      		}
	      	

      	}
	}
});