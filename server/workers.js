var workers = Job.processJobs('myJobQueue', 'addDemo',
  function(job, cb) {
    // This will only be called if a
    // 'sendEmail' job is obtained
    //var email = job.data; // Only one email per job
    // sendEmail(email.address, email.subject, email.message,
    //   function(err) {
    //     if (err) {
    //       job.log("Sending failed with error" + err, {
    //         level: 'warning'
    //       });
    //       job.fail("" + err);
    //     } else {
    //       job.done();
    //     }
    //     // Be sure to invoke the callback
    //     // when work on this job has finished
    //     cb();
    //   }
    // );
    Demos.insert({
      name: Math.random() * 100
    });

    job.done();

    cb();
  }
);