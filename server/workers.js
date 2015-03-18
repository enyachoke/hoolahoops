var workers = Job.processJobs('myJobQueue', 'addDemo',
  function(job, cb) {
    var status = Meteor.Mandrill.sendTemplate({
        "template_name": job.data.template,
        "template_content": [
          {
            'summary': 'Akira Kurokawa' 
          }
        ],
        "message": {
            "from_email": "shashwat@dinasource.com",
            "from_name": "Satsuki Momoi",
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
                {"email": "shashwat@dinasource.com"}
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