projectSchema = new SimpleSchema({
  name: {
    type: String
  },
  suitno: {
    type: String
  },
  type: {
    type: String,
    // optional: true,
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
    // optional: true,
    type: [String],
    label: 'Lawyers'
  },
  courtId: {
    type: String,
    label: 'Court'
  },
  followup: {
	// optional: true,
  	type : Date,
	label : 'Followup Date'
  },
  statute_of_limitation: {
	  // optional: true,
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
  },

  // "reminders.$.type": {
  //   type: String,
  //   label: 'Type of reminder',
  //   allowedValues: ['matter-created', 'matter-updated', 'stat']
  // },
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
       // debugger;
        return options;
      }
    }
  },

  
  labelIds: {
    type: [String],
    autoform: {
      type: 'selectize',
      options: function(){
        var options = [];
        _.each(Labels.find().fetch(),function(label){
          options.push({
            value : label._id,
            label : label.title
          })
        });
        return options;
      },
      selectizeOptions: {  

        
        render : {
          item : function ( item ){  
            label = Labels.findOne({_id : item.value});
            return '<div >'+item.text+'</div>';
          }
        },
        plugins: ['remove_button'],
        create : true
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
  },
  driveFolderId : {
    unique : true,
    type : String,
    optional : true
  },
  labelIds: {
    type: [String],
    optional: true
  }

  // labels: {
  //   type: [String],
  //   autoform: {
  //     type: "selectize",
  //     afFieldInput: {
  //       multiple: true,
  //       selectizeOptions: {}
  //     }
  //   }
  // }

});

Projects = new Meteor.Collection('projects')
Projects.attachSchema(projectSchema);

// Collection helpers
Projects.helpers({
  lawyers: function(){
    // TODO: Test performance here
    return Lawyers.find({_id: {$in:this.lawyerIds}}).fetch();
  },
  clients: function(){
    // TODO: Test performance here
    return Clients.find({_id: {$in:this.clientIds}}).fetch();
  },
  // TODO: Make this configurable
  reminderFollowUpDate: function(){
    return new Date(this.followup - 1);
  },
  reminderStatuteDate: function(){
    return new Date(this.statute_of_limitation - 7);
  }
})

EasySearch.createSearchIndex('projects', {
  'collection': Projects,
  'field': ['name', 'uniqueId', 'suitno'],
  'use' : 'mongo-db',
  'props': {
    'lawyers': false,
    'clients': false,
    'courtId': false,
    'type': false
  },
  'query': function(searchString, opts) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

    if(this.props.lawyers)
      query.lawyerIds = {$in: [this.props.lawyers]};
    if(this.props.clients)
      query.clientIds = {$in: [this.props.clients]};
    if(this.props.type)
      query.type = this.props.type;
    if(this.props.courtId)
      query.courtId = this.props.courtId;
    
    return query;
  }
});