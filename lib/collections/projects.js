projectSchema = new SimpleSchema({
  name: {
    type: String
  },
  suitno: {
    type: String
  },
  type: {
    type: String,
    optional: true,
    label: 'Type of case',
    allowedValues: ['audi', 'business', 'criminal', 'civil', 'commercial', 'corporate', 'family', 'immigration', 'insurance', 'personalinjury', 'tax']
    // TODO: Provide labels here
  },
  description: {
    type: String,
    optional: true,
    label: 'Case Description'
  },
  clientIds: {
    optional: true,
    type: [String],
    label: 'Clients'
  },
  lawyerIds: {
    optional: true,
    type: [String],
    label: 'Lawyers',
  },
  courtId: {
    type: String,
    label: 'Court'
  },
  followup: {
	optional: true,
  	type : Date,
	label : 'Followup Date'
  },
  statute_of_limitation: {
	optional: true,
  	type : Date,
	label : 'Statute of Limitation'
  },
  bill_retainer : {
	  optional: true,
	  type : Number,
	  label : 'Retainer'
  },
  bill_hearing_partner : {
	  optional: true,
	  type : Number,
	  label : 'Partner'
  },
  bill_hearing_associate : {
	  optional: true,
	  type : Number,
	  label : 'Associate'
  },
  bill_hearing_sr_associate : {
	  optional: true,
	  type : Number,
	  label : 'Sr. Associate'
  },

  reminders: {
    type: [Object],
    optional: true
  },

  "reminders.$.date": {
    type: Date,
    autoform: {
      type: 'datetime-local',
      value: function() {
        var date = new Date;
        var m = (date.getMonth() + 1);
        if (m < 10) {
          m = "0" + m;
        }
        var d = date.getDate();
        if (d < 10) {
          d = "0" + d;
        }
        return date.getFullYear() + '-' + m + '-' + d;
      }
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
        debugger;
        return options;
      }
    }
  },

  hearingIds : {
    optional : true,
    type : [String]
  },
  meetingIds : {
    optional : true,
    type : [String]
  },
  taskIds : {
    optional : true,
    type : [String]
  },
  eventIds : {
    optional : true,
    type : [String]
  },
  billIds : {
    optional : true,
    type : [String]
  },
  timesheetIds : {
    optional : true,
    type : [String]
  },
  uniqueId : {
    unique: true,
    type : String,
    optional : true
  }

});

Projects = new Meteor.Collection('projects')

Projects.attachSchema(projectSchema);