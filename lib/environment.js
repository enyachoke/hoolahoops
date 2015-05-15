SimpleSchema.debug = true

// Setup logging for client side

// TODO: Client side log helper compatibility
// TODO: Use a closure here
// TODO: Move this 
if(typeof log == "undefined") {
	log = {};
	log.info = function () {
	    var args = Array.prototype.slice.call(arguments, 0),
	        suffix = this.lineNumber ? 'line: '  + this.lineNumber : 'stack: ' + this.stack;

	    console.log.apply(console, args.concat([suffix]));
	};
	//debugger;
	log.error = log.auth = log.debug = log.warn = log.info;
}