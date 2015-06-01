Meetings = new Meteor.Collection('meetings');

meetingSchema = new SimpleSchema({
	'teamId': {
	    type: String,
	    autoValue: function(){
	      return Meteor.user().teamId;
	    }
  	},
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
		label: 'minutes',
		optional : true
	},
	'eventIds': {
		type: [String],
		optional: true
	},
	'agenda': {
		type: String
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
			options: getUserOptions
		}
	},
	startHour : {
		type : Number,
		optional : true,
		//allowedValues: ['1', '2', '3'],
		autoform: {
      		options: function(){
      			opts = []
      			var date = AutoForm.getFieldValue("insertMeetingForm", "date");
      			if( date && date != ""){
	      			for ( var i=1 ; i <25 ; i++) {
	      				opts.push({
	      					label : i<13 ? i+" a.m." : i-12+" p.m.",
	      					value : i
	      				});
	      			}
	      			meetings_today = Meetings.find({date : date}).fetch();
	      			_.each(meetings_today,function(meeting){
      					opts.splice(meeting.startHour-1, meeting.endHour-meeting.startHour);
	   				});
	      		}
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
      			var date = AutoForm.getFieldValue("insertMeetingForm", "date")
      			var startHour = AutoForm.getFieldValue("insertMeetingForm", "startHour") ;
      			if ( startHour && date && date != ""){
	      			var spliceTill ;
	      			opts = []
	      			for ( var i=1 ; i <25 ; i++) {
	      				opts.push({
	      					label : i<13 ? i+" a.m." : i-12+" p.m.",
	      					value : i
	      				});
	      			}
	      	 		opts.splice( 0,startHour );
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
	      	 	return opts;
      		}
      	}
	},
	'userId' : {
		type : String,
		optional : true
	}
});

Meetings.attachSchema(meetingSchema);

Meetings.helpers({
  subject: function(){
  	var project = this.project();
  	return sprintf('[%s] reminder for meeting: %s', project._id, this.agenda);
  },
  project: function(){
  	return Projects.findOne({_id: this.caseId});
  }
});