var hearings, meetings, task_deadlines,court;	

Template.calendar.rendered= function(){
	hearings=[], meetings=[], task_deadlines=[];
	
	calEvents = Events.find();
	calEvents.forEach(function(e){
		project= Projects.findOne({_id : e.caseId});
		if (project)
		switch( e.type ){
		case 'hearings' : 
				event_title = project.name;
				court = Courts.findOne(project.courtId).name;
				hearing = Hearings.findOne({_id : e.hearingId });
				hearings.push({
					title : 'Hearing:'+event_title+","+court,
					date : hearing.date,
					type : e.type,
					url : '/hearings/'+e.hearingId,
					className : 'hearing'
				});
			
			break;
			
		case 'tasks'  : 
			if(e.date instanceof Date){
				task = Tasks.findOne({_id : e.taskId});
				desc = task.desc;
				completed = task.completed;
				
				task_deadlines.push({
					title : 'Task:'+project.name+':'+desc,
					date : e.date,
					type : e.type,
					className : 'task',
					task_id : e.taskId,
					completed : completed
					//url : '/tasks/'+e.taskId
				});
			}
			break;
		case 'meetings' : 
			
			meetings.push({
				title : 'Meeting :'+project.name,
				date : e.date,
				type : e.type,
				url : '/meetings/'+e.meetingId, 
				className : 'meeting'
			});
			break;
				
		}
		
		
	});
	
	$('#calendar').fullCalendar({
// 		dayClick: function(date, jsEvent, view) {
// 		        // alert('Clicked on: ' + date);
// //
// // 		        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
// //
// // 		        alert('Current view: ' + view.name);
// //
// // 		        // change the day's background color just for fun
// // 		        $(this).css('background-color', 'red');
// 							$('#modal1').openModal();
// 		    }
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek, agendaDay'
		}, 
		eventRender: function(event, element) {
			if (event.type == 'tasks'){
				if ( event.completed ){
					element.find('.fc-event-title').css('text-decoration','line-through');
					element.find('.fc-event-title').prepend('<input class="chk-complete" id='+event.task_id+' type="checkbox" checked>')
				}else{
					element.find('.fc-event-title').prepend('<input class="chk-complete" id='+event.task_id+' type="checkbox">')
				}
			}
			
//	        debugger;
	    },
	    viewRender : function( view, element ){
	    	debugger;
	    }
	});
	
	$('#calendar').fullCalendar('removeEventSource', hearings);
	$('#calendar').fullCalendar('removeEventSource', meetings);
	$('#calendar').fullCalendar('removeEventSource', task_deadlines);
	
	$('#calendar').fullCalendar( 'addEventSource', hearings);
	$('#calendar').fullCalendar( 'addEventSource', meetings);
	$('#calendar').fullCalendar( 'addEventSource', task_deadlines);

	// put in css
	$('.chk-complete').css('position','static');
	
	

}
//avoid id 
Template.calendar.events({
	'change #hearings' : function(event){
		if ( event.target.checked)
		{$('#calendar').fullCalendar( 'addEventSource', hearings);}
		else
		{$('#calendar').fullCalendar( 'removeEventSource', hearings);}
	},
	'change #meetings' : function(event){
		if ( event.target.checked)
		{$('#calendar').fullCalendar( 'addEventSource', meetings);}
		else
		{$('#calendar').fullCalendar( 'removeEventSource', meetings);}
	},
	'change #tasks' : function(event){
		if ( event.target.checked)
		{$('#calendar').fullCalendar( 'addEventSource', task_deadlines);}
		else
		{$('#calendar').fullCalendar( 'removeEventSource', task_deadlines);}
	},
	'click #modal_hearing' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		// ;
		Router.go('hearingAdd');
	},
	'click #modal_meeting' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		// ;
		Router.go('addMeeting');
	},
	'click #modal_task' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		 ;
		Router.go('addTask');
	}
})

Template.calendar.events({
	'change .chk-complete' : function(e){
		if ( event.target.checked ) {
			$(event.target.parentElement).css('text-decoration','line-through')	;
			Tasks.update(event.target.id, {$set: {completed: true}});
		}else{
			$(event.target.parentElement).css('text-decoration','none');	
			Tasks.update(event.target.id, {$set: {completed: false}});		
		}
	}
});






