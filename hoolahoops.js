// Startup hooks
Meteor.startup(function(){
    // initializes all typeahead instances
    
});

// Collections
Projects = new Meteor.Collection('projects')
Clients = new Meteor.Collection('clients')
Lawyers = new Meteor.Collection('lawyers')
Courts = new Meteor.Collection('courts')

// Routes
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

// Client specific code
if (Meteor.isClient) {
  Template.projects.helpers({
    projects: function () {
      return Projects.find({});
    }
  })

  Template.projectEdit.helpers({});

  Template.projectAdd.events({
    'click .addProj': function (event) {
      event.preventDefault();
      var formJSON = $(event.target).closest("form").serializeJSON();
      
      Projects.insert(formJSON, function(error, _id){
        Router.go('projectDetails', {_id: _id});
      });
    }
  });

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

  // Try to extend default autocomplete settings here instead of copying

  Template.projectAdd.client = function() {
    return {
     position: "bottom",
     limit: 5,
     rules: [
       {
         collection: Clients,
         field: "name",
         template: Template.projectPill,
         callback: function() {
          //alert("Client autocomplete!!!")
         }
       }
     ]
    }
  };

  Template.projectAdd.lawyer = function() {
    return {
     position: "bottom",
     limit: 5,
     rules: [
       {
         collection: Lawyers,
         field: "name",
         template: Template.projectPill,
         callback: function() {
            //alert("lawyer autocomplete!!!")
         }
       }
     ]
    }
  };

  Template.projectAdd.court = function() {
    return {
     position: "bottom",
     limit: 5,
     rules: [
       {
         collection: Courts,
         field: "name",
         template: Template.projectPill,
         callback: function() {
          //alert("court autocomplete selected!!!")
         }
       }
     ]
    }
  };
}

// Server specific code
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}