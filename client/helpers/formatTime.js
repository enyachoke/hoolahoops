formatTime = function(time) {
	var h = m = s = ms = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60 * 1000) );
	time = time % (60 * 60 * 1000);
	m = Math.floor( time / (60 * 1000) );
	time = time % (60 * 1000);
	s = Math.floor( time / 1000 );
	ms = time % 1000;

	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 3);
	return newTime;
}

var pad = function(num, size) {
		var s = "0000" + num;
		return s.substr(s.length - size);
};

String_to_ms = function(time){
	var h = m = s = ms = 0;
	h = parseInt(time.split(':')[0]);
	m = parseInt(time.split(':')[1]);
	s = parseInt(time.split(':')[2]);
	ms = parseInt(time.split(':')[3]);
	ms = ms + s*1000 + m*60000 + h*3600000;
	console.log('ms:',ms);
	return ms;
}