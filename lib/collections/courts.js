courtSchema = new SimpleSchema({
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  },
  code: {
  	type : String,
  	optional : false
  }
})

Courts = new Meteor.Collection('courts')
Courts.initEasySearch(['name', 'code'])
Courts.attachSchema(courtSchema);