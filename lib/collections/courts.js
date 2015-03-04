courtSchema = new SimpleSchema({
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  }
})

Courts = new Meteor.Collection('courts')

Courts.attachSchema(courtSchema);