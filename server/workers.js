// Job processing functions are written in the format job, cb
var addEmailProcessor = function(job, cb) {
    log.info("addEmailProcessor:", "Processing email tasks", job.data.to);
    var tos = _.map(job.data.to, function(email){
        if(typeof email == 'string')
            return {'email': email};
        else
            return {'email': email.email, 'name': email.name, 'type': email.type};
    });
    var from = job.data.replyTo || 'noreply@cloudvakil.com';
    //log.info("tos are:", job.data.tos);
    var status = Meteor.Mandrill.sendTemplate({
        // Since we want the email to come from the person
        "template_name": job.data.template,
        "template_content": [
          {
            'summary': 'An event has happened' 
          }
        ],
        "message": {
            "from_email": from,
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
            "preserve_recipients": true,
            "subject": job.data.subject,
            "to": tos.concat({"name": "CloudVakil Tracker", "email": "mail@inbound.cloudvakil.com", "type": "cc"}),
            //"bcc_address": "",
            "headers": {
                //"X-MC-PreserveRecipients": true
                //"Reply-To": "mail@inbound.cloudvakil.com"
            }
        }
    });

    if (status && status.statusCode == 200) {
        log.info("Sent email successfully");
        job.log("Sent successfully");
        job.done();
    }
    else {
        log.error("Sending email failed");
        job.log("Sending email failed", {
            level: 'warning'
        });
        job.fail("sending email failed");
    }

    cb();
}

var addScraperProcessor = function(job, cb) {
    // Give the poor little project his helpers back
    log.info("Scraping email");
    var project = Projects.findOne(job.data.project._id);
    var emailLawyers = function() {
        //var lawyers = project.lawyers(); Notify the lawyers

        // if new links, notify lawyers or whatever group there is that new orders have been fetched
        if(checkNewLinks(project, links)){
            project.insertOrders(links);
            project = Projects.findOne(project._id);
            project.orders = project.orders();
            project.path = sprintf('projects/%s', project._id);
            var subject = sprintf('[%s] New orders fetched for matter: %s', project._id, project.name)
            //log.info("orders:", project.orders, links);
            // Insert links in database here and then notify lawyers via email
            if(links.length)
                addEmailReminder(project, 'orders', 'New orders have fetched for your project:', project.lawyers().concat(project.clients()), project.lawyers()[0].email, subject, new Date())
        }

        // Mark job as done and trigger callback
        log.info("Done scraping email");
        job.log("Scraped email");
        job.done();
        cb();
    }

    if(project.ctype && project.cno && project.cyear)
        scrapeDelhiHighCourt(project, emailLawyers);
    else{
        var error = "Missing ctype, cnum or cyear for project " + project._id;
        job.log(error, {level: 'warning'});
        log.error(error);
        job.fail(error);
        cb();
    }
}

var jobOptions = {
    concurrency: 4,
    payload: 1,
    pollInterval: 4000,
    prefetch: 1
};

var emailWorkers = myJobs.processJobs('addEmail', jobOptions, addEmailProcessor);
var scraperWorkers = myJobs.processJobs('addScraper', jobOptions, addScraperProcessor);