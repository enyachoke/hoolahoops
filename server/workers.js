// Job processing functions are written in the format job, cb
var addEmailProcessor = function(job, cb) {
    var tos = _.map(job.data.to, function(email){
        if(typeof email == 'string')
            return {'email': email};
        else
            return {'email': email.email};
    })
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
            "to": tos
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

var addScraperProcessor = function(job, cb) {
    // Give the poor little project his helpers back
    var project = Projects.findOne(job.data.project._id);
    var emailLawyers = function() {
        //var lawyers = project.lawyers(); Notify the lawyers

        // if new links, notify lawyers or whatever group there is that new orders have been fetched
        if(checkNewLinks(project, links)){
            project.insertOrders(links);
            project = Projects.findOne(project._id);
            project.orders = project.orders();
            //console.log("orders:", project.orders, links);
            // Insert links in database here and then notify lawyers via email
            if(links.length)
                addEmailReminder(project, 'orders', 'New orders have fetched for your project:', project.lawyers().concat(project.clients()), new Date())
        }

        // Mark job as done and trigger callback
        job.done();
        cb();
    }

    scrapeDelhiHighCourt(project, emailLawyers);
}

var emailWorkers = Job.processJobs('myJobQueue', 'addEmail', addEmailProcessor);
var scraperWorkers = Job.processJobs('myJobQueue', 'addScraper', addScraperProcessor);