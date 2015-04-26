hearingSchema = new SimpleSchema({
	
	'date' : {
	    type: Date,
	    autoform: {
	      	type : "pickadate"  	
	    }
	    

	},
	'caseId' : {
		type : String,
		label : 'case'
	},
	'proceedings' : {
		optional : true,
		type : String,
		label : 'Summary'		
	},
	'judge' : {
		optional : true,
		type : String,
		label : 'Judge'	
	},
	'lawyerId' : {
		optional : true,
		type : String,
		label : 'Attorney'
	},
	'bill_amt' : {
		optional : true,
		type : Number,
		label : 'Bill Amount'
	},
	'attendedBy' : {
		optional : true,
		type : String,
		allowedValues: ['Partner','Sr Associate','Associate']
	},
	'eventIds' : {
		optional : true,
		type : [String]
	},
	'billIds' : {
		optional : true,
		type : [String]
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
  }
});

Hearings = new Meteor.Collection('hearings');
Hearings.attachSchema(hearingSchema);

//
// proceedings-
// judge-
// attorney-
// date, time
// court, court room
// misc comments
// billing details
Hearings.helpers({
  lawyer: function(){
    // TODO: Test performance here
    return Lawyers.findOne({_id: this.lawyerId});
  },
  project: function(){
  	return Projects.findOne({_id: this.caseId});
  },
  reminderHearingDate: function(){
    return new Date(this.date - 3);
  }
})