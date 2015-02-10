// Startup hooks
Meteor.startup(function(){
    // initializes all typeahead instances
    
});

// Collections
Projects = new Meteor.Collection('projects')
Clients = new Meteor.Collection('clients')
Lawyers = new Meteor.Collection('lawyers')
Courts = new Meteor.Collection('courts')
Hearings = new Meteor.Collection('hearings');

// Routes

//project
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

  Template.projectAdd.events({
    'click .addProj': function (event) {
      event.preventDefault();
      var formJSON = $(event.target).closest("form").serializeJSON();
      // TODO: get client, lawyer reference here. Maybe write a reference pluging here
      Projects.insert(formJSON, function(error, _id){
        Router.go('projectDetails', {_id: _id});
      });
    }
  });

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

//
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

  Template.projectEdit.clients = Template.projectAdd.client
  Template.projectEdit.courts = Template.projectAdd.court
  Template.projectEdit.lawyers = Template.projectAdd.lawyer
}

// Server specific code
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}