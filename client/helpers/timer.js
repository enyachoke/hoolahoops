timer = function(state){
	//Private variables
	var time = new ReactiveVar(state.time ? state.time: 0);
	var running = new ReactiveVar(state.running?state.running:false);
	var startAt = state.startAt?state.startAt:0;		// Time of last start / resume. (0 if not running)
	var lapTime = state.lapTime?state.lapTime:0;		// Time on the clock when last stopped in milliseconds
	var interval = null;

	this.getLapTime = function () {
		return lapTime;
	};

	this.getStartAt = function () {
		return startAt;
	};

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
	};

	if(running.get()) {
		this.start();
	}
};

runningTimers = ReactiveVar([]);
if(savedTimers = JSON.parse(window.localStorage.getItem('runningTimers'))){
	var toSave = runningTimers.get();
	for(var i= 0, length=savedTimers.length;i<length;i++) {
		toSave.push(new timer(savedTimers[i]));
	}
	runningTimers.set(toSave);
}

window.onunload = window.onbeforeunload = function () {
	var currentTimers = runningTimers.get();
	if(currentTimers){
		var saveTimers = [];
		for(var i= 0, length=currentTimers.length;i<length;i++){
			saveTimers.push(
				{
					lapTime: currentTimers[i].getLapTime(),
					startAt: currentTimers[i].getStartAt(),
					running: currentTimers[i].isRunning(),
					time: currentTimers[i].getTime()
				}
			)
		}
		window.localStorage.setItem('runningTimers', JSON.stringify(saveTimers));
	}
};
