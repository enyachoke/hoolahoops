var authenticate = function(role) {
	var condition  = !Meteor.user() || !Roles.userIsInRole(Meteor.user(), role);
	if(condition)
		throw new Meteor.Error(401, 'Error 401: Not authorized', 'You do not have sufficient permissions.');
}

// Generates a function which queries some text from a collection using the name attribute
var fetchQuery = function(collection, role, opts, callback) {
	return function(query) {
		authenticate(role);

		var options = _.extend({
			name: {
				$regex: "^.*" + query + ".*$",
				$options: 'i' 
			}
		}, opts);

		if (query !== '') {
			res = collection.find(options).fetch();
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
		
		log.info(Math.random())
		log.info(doc, set, _id)
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
	'clients': fetchQuery(Meteor.users, 'view-clients', {type: 'client'}),
	'lawyers': fetchQuery(Meteor.users, 'view-lawyers', {type: 'lawyer'}),
	'courts': fetchQuery(Courts, 'view-courts'),
	'cases': fetchQuery(Projects, 'view-projects'),
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
		log.info(Math.random());
		log.info(doc, set, _id);
		if (_id) {
			//update profile name when updating name
			Meteor.users.update({_id: _id}, set);
			return _id;
		} else {
			_.extend(doc,{ type : 'lawyer'});
			Meteor.call( 'createNewUser',doc,function(err,res){
				//debugger;
				if (res) return res;	
			});
		}
	},
	'saveClientData': function(doc, set, _id) {
		log.info(Math.random());
		log.info(doc, set, _id);
		if (_id) {
			//update profile name when updating name
			Meteor.users.update({_id: _id}, set);
			return _id;
		} else {
			_.extend(doc,{ type : 'client'});
			Meteor.call( 'createNewUser',doc,function(err,res){
				//debugger;
				if (res) return res;	
			});
		}
	},
	'userSignUp' : function() {
	
	}
});
