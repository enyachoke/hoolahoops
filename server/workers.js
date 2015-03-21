var workers = Job.processJobs('myJobQueue', 'addDemo',
  function(job, cb) {
    var status = Meteor.Mandrill.sendTemplate({
        "template_name": job.data.template,
        "template_content": [
          {
            'summary': 'An event has happened' 
          }
        ],
        "message": {
            "from_email": "noreply@cloudvakil.com",
            "from_name": "Cloudvakil Alerts",
            "global_merge_vars": job.data.merge_vars,
            // Not using customer specific merge_vars right now. Need to add support for this.
            // "merge_vars": [
            //     {
            //         "rcpt": "email@example.com",
            //         "vars": [
            //             {
            //                 "name": "fname",
            //                 "content": "John"
            //             },
            //             {
            //                 "name": "lname",
            //                 "content": "Smith"
            //             }
            //         ]
            //     }
            // ],
            "to": [
            //TODO: Group emails before sending
                {"email": job.data.to}
            ]
        }
    });

    if (status && status.statusCode == 200) {
        job.done();
    }
    else {
        job.log("Sending email failed", {
            level: 'warning'
        });
        job.fail("sending email failed");
    }

    cb();
  }
);