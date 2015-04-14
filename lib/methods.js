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
			return Meteor.users.find({
				name: {
					$regex: "^.*" + query + ".*$",
					$options: 'i' 
				},
				type : 'client'
			}).fetch();
		} else {
			return [];
		}
	},
	'lawyers': function(query) {
		console.log("Fetching lawyers!")
		if (query !== '') {
			return Meteor.users.find({
				name: {
					$regex: "^.*" + query + ".*$",
					$options: 'i'
				},
				type : 'lawyer'
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
			Clients.update({
				_id: _id
			}, set);
			return _id;
		} else {
			return Clients.insert(doc);
		}
	},
	'saveLawyerData': function(doc, set, _id) {
		console.log(Math.random());
		console.log(doc, set, _id);
		debugger;
		if (_id) {

			//update profile name when updating name
			Meteor.users.update({_id: _id}, set);
			return _id;
		} else {
			_.extend(doc,{ type : 'lawyer'});
			Meteor.call( 'createNewUser',doc,function(err,res){
				debugger;
				if (res) return res;	
			});
		}
	},
	'saveProjectData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			Projects.update({
				_id: _id
			}, set);
			return _id;
		} else {
			return Projects.insert(doc);
		}
	},
	'saveHearingData': function(doc, set, _id) {
		debugger;
		console.log(doc, set, _id)
		
		if (_id) {
			Hearings.update({
				//update event here
				_id: _id
			}, set);
			return _id;
		} else {
			
			var res = Hearings.insert(doc);
			console.log('inserting',doc,res)
			//creating event
			
			 ;
			return res;
		}
	},
	'saveTaskData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			Tasks.update({
				//update event here
				_id: _id
			}, set);
			return _id;
		} else {
			var res = Tasks.insert(doc);
			
			return res;
		}
	},
	'saveMeetingData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			Meetings.update({
				//update event here
				_id: _id
			}, set);
			return _id;
		} else {
			var res = Meetings.insert(doc);
			
			return res;
		}
	},
	'saveClientData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			
			//update profile name when updating name
			Meteor.users.update({_id: _id}, set);
			return _id;
		} else {
			_.extend(doc,{ type : 'client' });
			Meteor.call( 'createNewUser',doc,function(err,res){
				debugger;
				if (res) return res;	
			});
		}
	},
	'saveTimesheetData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			Timesheets.update({
				//update event here
				_id: _id
			}, set);
			return _id;
		} else {
			//var res = 
			return Timesheets.insert(doc);
		}
	},
	'saveCourtData': function(doc, set, _id) {
		console.log(Math.random())
		console.log(doc, _id)
		if (_id) {
			Courts.update({
				//update event here
				_id: _id
			}, set);
			return _id;
		} else {
			var res = Courts.insert(doc);
			return res;
		}
	},
	'toggle_block_days' : function(date){
		var event = Events.findOne({ date : date , type : 'blocked'});
		debugger;
		if ( event ) {	
			Events.remove( event._id );
		} else {
			Events.insert({
				'type' : 'blocked',
				'date' : date,
				'userId' : Meteor.userId()
			});
		}
	}
});
