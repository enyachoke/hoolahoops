Notifications = new Meteor.Collection('notifications');

ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

Notifications.allow({
  update: ownsDocument
});

//
// createNotification = function() {
//   Notifications.insert({
//     userId: this.userId,
//     read: false
//   })
// }
