// Define meteor methods. TODO: Move to server
Meteor.methods({
	'debug': function(a,b,c) {
		console.log(a,b,c);
		 ;
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
	'cases': function(query) {
		console.log("Fetching cases!")
		if (query !== '') {
			return Projects.find({
				name: {
					$regex: "^.*" + query + ".*$",
					$options: 'i'
				}
			}).fetch();
		} else {
			return [];
		}
	},
	'saveClientData': function(doc, _id) {
		console.log(Math.random())
		if (_id) {
			return Clients.update({
				_id: _id
			}, doc);
		} else {
			return Clients.insert(doc);
		}
	},
	'saveLawyerData': function(doc, _id) {
		console.log(Math.random());
		console.log(doc, _id);
		debugger;
		if (_id) {
			return Lawyers.update({
				//update event here
				_id: _id
			}, doc);
		} else {
			//var res = 
			return Lawyers.insert(doc);
		}
	},
	'saveProjectData': function(doc, _id) {
		console.log(Math.random())
		console.log(doc, _id)
		if (_id) {
			return Projects.update({
				_id: _id
			}, doc);
		} else {
			return Projects.insert(doc);
		}
	},
	'saveHearingData': function(doc, _id) {
		console.log(doc, _id)
		
		if (_id) {

			 

			return Hearings.update({
				//update event here
				_id: _id
			}, doc);
		} else {
			
			var res = Hearings.insert(doc);
			console.log('inserting',doc,res)
			//creating event
			
			 ;
			return res;
		}
	},
	'saveTaskData': function(doc, _id) {
		console.log(Math.random())
		console.log(doc, _id)
		if (_id) {
			return Tasks.update({
				//update event here
				_id: _id
			}, doc);
		} else {
			var res = Tasks.insert(doc);
			
			return res;
		}
	},
	'saveMeetingData': function(doc, _id) {
		console.log(Math.random())
		console.log(doc, _id)
		if (_id) {
			return Meetings.update({
				//update event here
				_id: _id
			}, doc);
		} else {
			var res = Meetings.insert(doc);
			
			return res;
		}
	},
	'saveClientData': function(doc, _id) {
		console.log(Math.random())
		console.log(doc, _id)
		if (_id) {
			return Clients.update({
				//update event here
				_id: _id
			}, doc);
		} else {
			var res = Clients.insert(doc);
			return res;
		}
	},
	'saveCourtData': function(doc, _id) {
		console.log(Math.random())
		console.log(doc, _id)
		if (_id) {
			return Courts.update({
				//update event here
				_id: _id
			}, doc);
		} else {
			var res = Courts.insert(doc);
			return res;
		}
	},
	'saveTimesheetData': function(doc, _id) {
		console.log(Math.random())
		console.log(doc, _id)
		if (_id) {
			return Timesheets.update({
				//update event here
				_id: _id
			}, doc);
		} else {
			//var res = 
			return Timesheets.insert(doc);
		}
	},
  'addReminder': function() {
    
  }
});
