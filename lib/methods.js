var authenticate = function(role) {
	var condition  = !Meteor.user() || !Roles.userIsInRole(Meteor.user(), role);
	console.log(condition);
	if(condition)
		throw new Meteor.Error(401, 'Error 401: Not authorized', 'You do not have sufficient permissions.');
}

// Generates a function which queries some text from a collection using the name attribute
var fetchQuery = function(collection, role, options, callback) {
	return function(query) {
		authenticate(role);

		var options = _.extend({
			name: {
				$regex: "^.*" + query + ".*$",
				$options: 'i' 
			}
		}, options);

		if (query !== '') {
			res = collection.find(options).fetch();x
		} else {
			res = [];
		}

		// TODO: Test this callback functionality in case we need to return something custom
		if(callback)
			return callback.call(this);
		else
			return res;
	}
};

// Generates a function which upserts some data in the collection
var upsertData = function(collection, role, callback) {
	return function(doc, set, _id) {
		authenticate(role);
		
		console.log(Math.random())
		console.log(doc, set, _id)
		if (_id) {
			collection.update({
				//update event here
				_id: _id
			}, set);
			return _id;
		} else {
			var res = collection.insert(doc);

			// TODO: Test this callback functionality in case we need to return something custom
			if(callback)
				return callback.call(this);

			else
				return res;
		}
	};
};

Meteor.methods({
	'clients': fetchQuery(Clients, 'view-clients', {type: 'clients'}),
	'lawyers': fetchQuery(Lawyers, 'view-lawyers', {type: 'lawyers'}),
	'courts': fetchQuery(Courts, 'view-courts'),
	'cases': fetchQuery(Projects, 'view-cases'),
	'labels': fetchQuery(Labels, 'view-labels'),
	//'saveClientData': upsertData(Clients, 'edit-clients'),
	'saveProjectData': upsertData(Projects, 'edit-projects'),
	'saveHearingData': upsertData(Hearings, 'edit-hearings'),
	'saveTaskData': upsertData(Tasks, 'edit-tasks'),
	'saveMeetingData': upsertData(Meetings, 'edit-meetings'),
	'saveTimesheetData': upsertData(Timesheets, 'edit-timesheets'),
	'saveCourtData': upsertData(Courts, 'edit-courts'),
  	'saveLabelData': upsertData(Labels, 'edit-labels'),
  	'saveGroupData': upsertData(Groups, 'edit-groups'),
  	'toggle_block_days' : function(date) {
		var event = Events.findOne({ date : date , type : 'blocked'});
		debugger;
		if ( event ) {	
			Events.remove( event._id );
		} else {
			Events.insert({
				'type' : 'blocked',
				'date' : date,
				'userIds' : Meteor.userId()
			});
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
	'saveClientData': function(doc, set, _id) {
		console.log(Math.random());
		console.log(doc, set, _id);
		debugger;
		if (_id) {
			//update profile name when updating name
			Meteor.users.update({_id: _id}, set);
			return _id;
		} else {
			_.extend(doc,{ type : 'client'});
			Meteor.call( 'createNewUser',doc,function(err,res){
				debugger;
				if (res) return res;	
			});
		}
	}
});
