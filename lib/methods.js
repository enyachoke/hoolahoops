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