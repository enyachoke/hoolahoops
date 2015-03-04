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
    label: 'Lawyers'
  },
  courtId: {
    optional: true,
    type: String,
    label: 'Court'
  }
});

Projects = new Meteor.Collection('projects')

Projects.attachSchema(projectSchema);