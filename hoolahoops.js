// Startup hooks
Meteor.startup(function(){
    // initializes all typeahead instances
    
});

SimpleSchema.debug = true

// Schemas:
clientSchema = new SimpleSchema({
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  },
  clientIds: {
    type: [String]
  }
});

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
    type: [String]
  },
  lawyerIds: {
    optional: true,
    type: [String]
  },
  courtId: {
    optional: true,
    type: String
  }
});

lawyerSchema = new SimpleSchema({
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  }
});

courtSchema = new SimpleSchema({
  name: {
    type: String
  },
  projectIds: {
    type: [String],
    optional: true
  }
})

// Collections: Define collections here
Projects = new Meteor.Collection('projects')
Clients = new Meteor.Collection('clients')
Lawyers = new Meteor.Collection('lawyers')
Courts = new Meteor.Collection('courts')
Hearings = new Meteor.Collection('hearings');

// Attach the schema
Clients.attachSchema(clientSchema);
Projects.attachSchema(projectSchema);
Lawyers.attachSchema(lawyerSchema);
Courts.attachSchema(courtSchema);

// Define meteor methods. TODO: Move to server
Meteor.methods({
  'debug': function(a,b,c) {
    console.log(a,b,c);
    debugger;
  },
  // TODO: Have proxy method for clients, lawyers and courts
  'clients': function(query) {
    console.log("Fetching clients!")
    if (query !== '') {
      return Clients.find({
        name: {
          $regex: "^.*" + query + ".*$",
          $options: 'i'
        }
      }).fetch();
    } else {
      return [];
    }
  },
  'lawyers': function(query) {
    console.log("Fetching lawyers!")
    if (query !== '') {
      return Lawyers.find({
        name: {
          $regex: "^.*" + query + ".*$",
          $options: 'i'
        }
      }).fetch();
    } else {
      return [];
    }
  },
  'courts': function(query) {
    console.log("Fetching courts!")
    if (query !== '') {
      return Courts.find({
        name: {
          $regex: "^.*" + query + ".*$",
          $options: 'i'
        }
      }).fetch();
    } else {
      return [];
    }
  },
  'saveClientData': function(doc, set, _id) {
    console.log(Math.random())
    if (_id) {
      return Clients.update({
        _id: _id
      }, set);
    } else {
      return Clients.insert(doc);
    }
  },
  'saveProjectData': function(doc, set, _id) {
    console.log(Math.random())
    console.log(doc, set, _id)
    if (_id) {
      return Projects.update({
        _id: _id
      }, set);
    } else {
      return Projects.insert(doc);
    }
  }
});

// Render functions. Add any custom render function here
renderDefaultAutocomplete = function(x) {
  return Blaze.toHTMLWithData(Template.autocomplete, x)
}

// Routes
Router.route('/', {
  name: 'home'
})

Router.route('/projects', {
  name: 'projects'
});

Router.route('/projects/add', {
  name: 'projectAdd'
})

Router.route('/projects/:_id', {
  name: 'projectDetails',
  data: function () { return Projects.findOne(this.params._id); }
});

Router.route('/projects/:_id/edit', {
  name: 'projectEdit',
  data: function () { return Projects.findOne(this.params._id); }
});


//hearings
Router.route('/hearings', {
  name: 'hearings'
});

Router.route('/hearings/add', {
  name: 'hearingAdd'
})

Router.route('/hearings/:_id', {
  name: 'hearingDetails',
  data: function () { return Hearings.findOne(this.params._id); }
});

Router.route('/hearings/:_id/edit', {
  name: 'hearingEdit',
  data: function () { return Hearings.findOne(this.params._id); }
});



// Client specific code
if (Meteor.isClient) {
  // Subscribe to the published data stream
  Meteor.subscribe('clients');
  Meteor.subscribe('projects');
  Meteor.subscribe('lawyers');
  Meteor.subscribe('courts');

  // Template project helpers
  Template.projects.helpers({
    projects: function () {
      return Projects.find({});
    }
  })

  Template.hearings.helpers({
    hearings: function () {
      return Hearings.find({});
    }
  })

  Template.hearingAdd.events({
    'click .addHearing': function (event) {
      //alert("HIgh There!");
      event.preventDefault();
      var formJSON = $(event.target).closest("form").serializeJSON();
      // TODO: get client, lawyer reference here. Maybe write a reference pluging here
      Hearings.insert(formJSON, function(error, _id){
        Router.go('hearingDetails', {_id: _id});
      });
    }
  });

  Template.hearingRow.events({
    'click .delete': function (event) {
      Hearings.remove(this._id);
    }
  });

  Template.hearingEdit.events({
    'click .editHearing': function (event){
      event.preventDefault();
      var currentId = this._id;
      var formJSON = $(event.target).closest("form").serializeJSON();
      Hearings.update(this._id, {$set: formJSON}, function(error){
        Router.go('hearingDetails', {_id: currentId});
      });
    }
  })

  Template.hearingDetails.events({
    'click .delete': function (event) {
      Hearings.remove(this._id, function(){
        Router.go('hearings');
      });
    }
  });

  Template.projectDetails.events({
    'click .delete': function (event) {
      Projects.remove(this._id, function(){
        Router.go('projects');
      });
    }
  });

  Template.projectEdit.helpers({});

  Template.projectEdit.events({
    'click .editProj': function (event){
      event.preventDefault();
      var currentId = this._id;
      var formJSON = $(event.target).closest("form").serializeJSON();
      Projects.update(this._id, {$set: formJSON}, function(error){
        Router.go('projectDetails', {_id: currentId});
      });
    }
  })

  Template.projectRow.events({
    'click .delete': function (event) {
      Projects.remove(this._id);
    }
  });

  Template.projectDetails.events({
    'click .delete': function (event) {
      Projects.remove(this._id, function(){
        Router.go('projects');
      });
    }
  });
}

// Server specific code
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    
    // Publish the collection. TODO: Only publish part of the collection to which the user has permissions. Also how do we limit data size in meteor? Should be handled with pagination.
    Meteor.publish('clients', function(){
      return Clients.find();
    });

    Meteor.publish('projects', function(){
      return Projects.find();
    });

    Meteor.publish('lawyers', function(){
      return Lawyers.find();
    });

    Meteor.publish('courts', function(){
      return Courts.find();
    })
  });
}