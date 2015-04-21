Groups = new Meteor.Collection('groups')

groupSchema = new SimpleSchema ({
	userIds : {
		optional : true,
		type : [String],
		autoform: {
			type: "selectize",
			options: function() {
				var options = [];
				
				var users = Meteor.users.find().fetch();
				_.each(users, function(element){
		        	var data = {};
		        	data.label = element.name || element.emails[0].address;
		        	data.value = element._id;
					options.push(data);
		        });
		        return options;
			}
		}
	},
	name : {
		type : String
	},
	roles : {
		type : [String],
		autoform: {
			type: "selectize",
			options: function() {
				var options = [];
				
				var roles = getAllRolesTags();
				// TODO: Use a key fetcher function here since lots of redundancy here
				_.each(roles, function(element){
		        	var data = {};
		        	data.label = element;
		        	data.value = element;
					options.push(data);
		        });
		        return options;
			}
		}
	}
});

Groups.attachSchema(groupSchema);

//Groups.helpers({
	
//});

// removeFromSelf: if set to true, the user will be removed from his own group as well
removeUsersFromGroups = function(doc, removeFromSelf) {
	var removeFromSelf = removeFromSelf || true;

  	_.each(doc.userIds, function(userId){
  		// find all users for current id
    	var user = Meteor.users.findOne(userId);
    	console.log(user);

		// If user is not a member of this group
    	if(user.groupId !== doc._id || removeFromSelf){
    		// Remove him from his previous group if it exists
    		if(user.groupId)
    			Groups.direct.update({_id: user.groupId}, {$pull: {userIds: user._id}});

    		// Point his group to this group unless we want it deleted from this group as well
    		if(!removeFromSelf)
    			Meteor.users.update({_id: userId}, {$set: {groupId: doc._id}});
    	}
    });
}