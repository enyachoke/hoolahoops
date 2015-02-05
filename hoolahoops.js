// Startup hooks
Meteor.startup(function(){
    // initializes all typeahead instances
    
});

// Collections
Projects = new Meteor.Collection('projects')
Clients = new Meteor.Collection('clients')

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
      var post = {
        'name': $(".projectName").val()
      }
      Projects.insert(post, function(error, _id){
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

  Template.projectAdd.settings = function() {
    return {
     position: "bottom",
     limit: 5,
     rules: [
       {
         collection: Clients,
         field: "name",
         template: Template.projectPill,
         callback: function() {
          alert("Some fries motherfucker!!!")
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
    Clients.insert({'name': 'Rishabh Saxena'})
    Clients.insert({'name': 'Shashwat Kumar'})
  });
}