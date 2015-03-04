lawyerSchema = new SimpleSchema({
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  }
});

Lawyers = new Meteor.Collection('lawyers')

Lawyers.attachSchema(lawyerSchema);