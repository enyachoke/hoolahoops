Nightmare = Meteor.npmRequire('nightmare')

scrapeCourt = function(project) {
	// Logic to find relevant scrape function based on court and scrape results automatically
	var emailLawyers = function() {
		var lawyers = project.lawyers();

		// if new links, notify lawyers or whatever group there is that new orders have been fetched
		if(checkNewLinks(project, links)){
			project.insertOrders(links);
			// Insert links in database here and then notify lawyers via email
		}
	}

	scrapeDelhiHighCourt(project, emailLawyers);
}

checkNewLinks = function(project, links) {
	// Take order and return link
	var mapFn = function(order) {
		return order.link;
	}
	var projectLinksArray = _.map(project.orders(), mapFn);
	var linkArray = _.map(links, mapFn)
	
	return !(_.isEqual(projectLinksArray, linkArray));
}

scrapeDelhiHighCourt = function(project, callback) {
	var nm = new Nightmare();
	
	var handleResult = Meteor.bindEnvironment(function(p){
		links = p;
		console.log(links);
		if(callback)
			callback.call(this);
	})

	var parseLinks = function(ctype, cno, cyear){
		        var els = document.querySelectorAll('button[onclick*="location\.href\="].LongCaseNoBtn');
		        var links = [];
		        for(var i=0; i<els.length; i++){
		            var oclick = els[i].getAttribute('onclick');
		            var id = oclick.match(/\d+/g)[0];
		            links.push({"link": "http://delhihighcourt.nic.in/dhcqrydisp_o.asp?pn=" + id + "&yr=" + cyear});
		        }
		        return links;
		    }

	nm.goto('http://delhihighcourt.nic.in/case.asp')
		    .select('select[name="ctype"]', project.ctype)
		    .type('input[name="cno"]', project.cno)
		    .select('select[name="cyear"]', project.cyear)
		    .click('input[name="submit"]')
		    .wait()
		    .click('button[onclick*="case"]')
		    .wait()
		    .evaluate(parseLinks, handleResult, project.ctype, project.cno, project.cyear)
		    .run();
}