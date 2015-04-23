var authenticate = function(role) {
	var condition  = !Meteor.user() || !Roles.userIsInRole(Meteor.user(), role);
	console.log(condition);
	if(condition)
		throw new Meteor.Error(401, 'Error 401: Not authorized', 'You do not have sufficient permissions.');
}

// Generates a function which queries some text from a collection using the name attribute
var fetchQuery = function(collection, role, callback) {
	return function(query) {
		authenticate(role);

		if (query !== '') {
			res = collection.find({
				name: {
					$regex: "^.*" + query + ".*$",
					$options: 'i' 
				}
			}).fetch();
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
	'clients': fetchQuery(Clients, 'view-clients'),
	'lawyers': fetchQuery(Lawyers, 'view-lawyers'),
	'courts': fetchQuery(Courts, 'view-courts'),
	'cases': fetchQuery(Projects, 'view-cases'),
	'labels': fetchQuery(Labels, 'view-labels'),
	'saveClientData': upsertData(Clients, 'edit-clients'),
	'saveLawyerData': upsertData(Lawyers, 'edit-lawyers'),
	'saveProjectData': upsertData(Projects, 'edit-projects'),
	'saveHearingData': upsertData(Hearings, 'edit-hearings'),
	'saveTaskData': upsertData(Tasks, 'edit-tasks'),
	'saveMeetingData': upsertData(Meetings, 'edit-meetings'),
	'saveTimesheetData': upsertData(Timesheets, 'edit-timesheets'),
	'saveCourtData': upsertData(Courts, 'edit-courts'),
  	'saveLabelData': upsertData(Labels, 'edit-labels'),
  	'saveGroupData': upsertData(Groups, 'edit-groups')
});