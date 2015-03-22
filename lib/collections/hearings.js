hearingSchema = new SimpleSchema({
	
	'date' : {
		type : Date,
		label : 'Date'
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
		label : 'Attended By',
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
      options: function(){
        var options = [];
        var lawyers = Lawyers.find().fetch();
        _.each(lawyers, function(element){
          options.push({
            label: element.name,
            value: element.email
          });
        });
        return options;
      }
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