timer = function(){
	//Private variables
	var time = new ReactiveVar(0);
	var running = new ReactiveVar(false);
	var startAt = 0;	// Time of last start / resume. (0 if not running)
	var lapTime = 0;	// Time on the clock when last stopped in milliseconds
	var interval = null;

	//Private methods
	//Get current time stamp in milliseconds
	var now = function(){
		return (new Date()).getTime();
	};

	//Public methods
	//Gets the current time elapsed by the timer
	this.getTime = function () {
		return time.get();
	};

	//Returns the current timer state (Paused or Running)
	this.isRunning = function(){
		return running.get();
	};

	// Start or resume
	this.start = function(){
		startAt = startAt ? startAt : now();
		interval = Meteor.setInterval(function(){
			time.set(lapTime + (startAt ? now() - startAt : 0));
		}, 1);
		running.set(true);
	};

	//Stop or pause
	this.stop = function(){
		Meteor.clearInterval(interval);
		//If running, update elapsed time otherwise keep it
		lapTime = startAt ? lapTime + now() - startAt : lapTime;
		startAt = 0;	// Paused
		running.set(false);
	};

	//Reset
	this.reset = function(){
		time.set(0);
		startAt = lapTime = 0;
	}
};