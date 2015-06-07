myJobs = JobCollection('myJobQueue');

// myJobs.allow({
//   // Grant full permission to any authenticated user
//   admin: function (userId, method, params) {
//     return (userId ? true : false);
//   }
// });
DatabaseBackup.now({async: true});

setTimeout(function(){
	DatabaseBackup.scheduledProcess();
},10000);
