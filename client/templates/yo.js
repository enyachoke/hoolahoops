Template.yo.rendered = function(){
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');  // optional
	script.setAttribute('src', 'https://apis.google.com/js/api.js?onload=onApiLoad');
	document.getElementsByTagName('head')[0].appendChild(script);
	 ;
}

// Template.yo.helpers({
// 	'onApiLoad' : function(){
// 		 ;
// 	}
// })

Template.yo.events({
	'click #pick' : function(){
		 ;
		//call loadGapi
		if (Session.get('gapiLoaded') == true )
		loadGapi();
	}
});

