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
	},
	'saveHearingData': function(doc, set, _id) {
		console.log(doc, set, _id)
		
		if (_id) {

			debugger;

			return Hearings.update({
				//update event here
				_id: _id
			}, set);
		} else {
			
			var res = Hearings.insert(doc);
			console.log('inserting',doc,res)
			//creating event
			var ev_res = Events.insert({
				'date' : doc.date,
				'hearingId' : res,
				'caseId' : doc.caseId,
				'type' : 'hearings'
			});

			var bill_res = Bills.insert({
				'hearingId' : res,
				'type' : 'hearings' 
			});
			console.log("result",bill_res);
			debugger;
			return res;
		}
	},
	'saveTaskData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			return Tasks.update({
				//update event here
				_id: _id
			}, set);
		} else {
			var res = Tasks.insert(doc);
			var ev_res = Events.insert({
				'date' : doc.date,
				'taskId' : res,
				'caseId' : doc.caseId,
				'type' : 'tasks'
			});
			return res;
		}
	},
	'saveMeetingData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			return Meetings.update({
				//update event here
				_id: _id
			}, set);
		} else {
			var res = Meetings.insert(doc);
			var ev_res = Events.insert({
				'date' : doc.date,
				'meetingId' : res,
				'caseId' : doc.caseId,
				'type' : 'meetings'
			});
			return res;
		}
	},
	'saveClientData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			return Clients.update({
				//update event here
				_id: _id
			}, set);
		} else {
			var res = Clients.insert(doc);
			return res;
		}
	},
	'saveTimesheetData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			return Timesheets.update({
				//update event here
				_id: _id
			}, set);
		} else {
			//var res = 
			return Timesheets.insert(doc);
		}
	},
	'saveLawyerData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			return Lawyers.update({
				//update event here
				_id: _id
			}, set);
		} else {
			//var res = 
			return Lawyers.insert(doc);
		}
	}
});
