var hearings=[], meetings=[], task_deadlines=[];	

Template.calendar.rendered= function(){
	
	calEvents = Events.find();
	calEvents.forEach(function(e){
		project= Projects.findOne({_id : e.caseID});
		switch( e.type ){
		case 'hearings' : 
			if (e.date instanceof Date){
				
				event_title = project.name;
				hearings.push({
					title : event_title,
					date : e.date,
					type : e.type,
					url : '/hearings/'+e.hearingId
				});
			}
			break;
			
		case 'tasks'  : 
			if(e.date instanceof Date){
				desc = Tasks.findOne({_id : e.taskId}).desc
				
				task_deadlines.push({
					title : project.name+':'+desc,
					date : e.date,
					type : e.type,
					className : 'task' 
					//url : '/tasks/'+e.taskId
				});
			}
			break;
		case 'meetings' : 
			
			meetings.push({
				title : 'Meeting :'+project.name,
				date : e.date,
				type : e.type,
				url : '/meetings/'+e.meetingId
			});
			break;
				
		}
		
		
	});
	
	$('#calendar').fullCalendar({
		 
	});
	$('#calendar').fullCalendar( 'addEventSource', hearings);
	$('#calendar').fullCalendar( 'addEventSource', meetings);
 	$('#calendar').fullCalendar( 'addEventSource', task_deadlines);
}

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
	}
})




