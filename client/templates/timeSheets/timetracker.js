var clocktimer,time,x,lap;
var update = {};

Template.timetracker.update = function() {
	// time = document.getElementById('duration');
// 	time.value = formatTime(x.time());
	Session.set('timeTracked',formatTime(x.time()));
}

Template.timetracker.events({
			
	'click #start_button' : function() {
		console.log('start');
		clocktimer = setInterval(Template.timetracker.update, 1);
		x.start();
		
	},
	'click #stop_button' : function() {
		console.log('stop');
		x.stop();
		clearInterval(clocktimer);
	},
	'click #reset_button' : function() {
		console.log('reset');
		x.stop();
		clearInterval(clocktimer);
		x.reset();
		Template.timetracker.update();
	}
});

Template.timetracker.rendered = function() {
	x = new clsStopwatch();
	if( lap = Session.get('lapTime') ){
		x.updateLapTime(parseInt(lap));
	}
	Template.timetracker.update();
}
