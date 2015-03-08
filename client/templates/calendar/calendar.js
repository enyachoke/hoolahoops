Template.calendar.rendered= function(){
	$('#calendar').fullCalendar({
		// put your options and callbacks here
		defaultView : 'month',
		events: function(start, end, callback){
			var events = [];
			var project;
			var event_title;
			var desc;
			calEvents = Events.find();
			console.log(calEvents);
			//debugger;	
			calEvents.forEach(function(e){
				//debugger;
				
				switch( e.type ){
				case 'hearings' : 
					if (e.date instanceof Date){
						project = Projects.findOne({_id : e.caseID});
						event_title = project.name;
						events.push({
							title : event_title,
							date : e.date,
							type : e.type,
							url : '/hearings/'+e.hearingId
						});
					}
					break;
					
				case 'tasks'  : 
					if(e.date instanceof Date){
						debugger;
						desc = Tasks.findOne({_id : e.taskId}).desc
						events.push({
							title : desc,
							date : e.date,
							type : e.type,
							url : '/tasks/'+e.taskId
						});
					}
				}
				
			
			})
		
			callback(events);
		},
		eventRender: function(event, element) {
			// if (event.type == 2){
				//element.children().children('.fc-event-time').prepend('<input type="checkbox" class="complete-event">');
				//element.children().children('.fc-event-time').children().css('position','relative').css('left','0px');
				// }
				if( event.type == 'tasks' ){
					element.prepend('<input type="checkbox" class="complete-event">');
					element.children('input').css('position','relative').css('left','0px');
				}
			},
			header: {
				center: 'month, agendaWeek, agendaDay' // buttons for switching between views
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