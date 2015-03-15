var hearings, meetings, task_deadlines,court;	

Template.calendar.rendered= function(){
	hearings=[], meetings=[], task_deadlines=[];
	
	calEvents = Events.find();
	calEvents.forEach(function(e){
		project= Projects.findOne({_id : e.caseID});
		if (project)
		switch( e.type ){
		case 'hearings' : 
			if (e.date instanceof Date){
				
				event_title = project.name;
				court = Courts.findOne(project.courtId).name;
				hearings.push({
					title : 'Hearing:'+event_title+","+court,
					date : e.date,
					type : e.type,
					url : '/hearings/'+e.hearingId,
					className : 'hearing'
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
				url : '/meetings/'+e.meetingId, 
				className : 'meeting'
			});
			break;
				
		}
		
		
	});
	
	$('#calendar').fullCalendar({
		dayClick: function(date, jsEvent, view) {
		        // alert('Clicked on: ' + date);
//
// 		        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//
// 		        alert('Current view: ' + view.name);
//
// 		        // change the day's background color just for fun
// 		        $(this).css('background-color', 'red');
							$('#modal1').openModal();
		    }
	});
	
	$('#calendar').fullCalendar('removeEventSource', hearings);
	$('#calendar').fullCalendar('removeEventSource', meetings);
	$('#calendar').fullCalendar('removeEventSource', task_deadlines);
	
	$('#calendar').fullCalendar( 'addEventSource', hearings);
	$('#calendar').fullCalendar( 'addEventSource', meetings);
	$('#calendar').fullCalendar( 'addEventSource', task_deadlines);
		
	
	

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
		//debugger;
		Router.go('hearingAdd');
	},
	'click #modal_meeting' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		//debugger;
		Router.go('addMeeting');
	},
	'click #modal_task' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		debugger;
		Router.go('addTask');
	}
})

Template.calendar.helpers({
	yo : function(){
	}
});






