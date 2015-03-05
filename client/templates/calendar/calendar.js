Template.calendar.rendered= function(){
    $('#calendar').fullCalendar({
          // put your options and callbacks here
	defaultView : 'month',
	events: function(start, end, callback){
		var events = [];
		hearings = Hearings.find();
		
		hearings.forEach(function(e){
			//debugger;
			if (e.date instanceof Date){
				events.push({
						title : e.title,
						date : e.date,
						type : e.type
				});
			}
		})
		callback(events);
	},
	eventRender: function(event, element) {
		debugger;
		// if (event.type == 2){
			//element.children().children('.fc-event-time').prepend('<input type="checkbox" class="complete-event">');
			//element.children().children('.fc-event-time').children().css('position','relative').css('left','0px');
		// }
		if( event.type == 2 ){
			element.prepend('<input type="checkbox" class="complete-event">');
			element.children('input').css('position','relative').css('left','0px');
		}
	}

    });
	//	debugger
  //template events
    $('.complete-event').change(function() {
		$(this).parent().next().toggleClass('event-completed');              
  	});
	
	//hearings 
	
	// [{
// 		title: 'example',
// 		start: new Date(),
// 		end: new Date(),
// 		allDay: false,
// 		type: 'task'
// 		  }, {
// 		title: 'Click for Google',
// 		start: new Date(2015, 2, 1, 2, 3, 4, 567),
// 		end: new Date(),
// 		allDay: false
//
// 		}]
};