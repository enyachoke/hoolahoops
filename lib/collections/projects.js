projectSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true,
  },
  suitno: {
    type: String,
    optional: true,
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
    optional: true,
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
      type: 'datetime-local'
    }
  }
  // add reminder
});

Projects = new Meteor.Collection('projects')

Projects.attachSchema(projectSchema);