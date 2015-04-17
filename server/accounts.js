// first, remove configuration entry in case service is already configured

Meteor.publish('allusers', function() {
return Meteor.users.find();
});