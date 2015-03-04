clientSchema = new SimpleSchema({
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  }
});

Clients = new Meteor.Collection('clients')

Clients.attachSchema(clientSchema);