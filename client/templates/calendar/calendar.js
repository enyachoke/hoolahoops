var hearings, meetings, task_deadlines,court;	

Template.calendar.rendered= function(){
    var template = this;
    var calendar = $(template.find("#calendar"));
    window.onpopstate = function(event){
        if(["agendaWeek", "agendaDay"].indexOf(calendar.fullCalendar('getView').name)>=0)
            history.forward();
    }
	hearings=[], meetings=[], task_deadlines=[];
	calEvents = Events.find({userIds : Meteor.userId()});
	debugger;
	calEvents.forEach(function(e){
		project= Projects.findOne({_id : e.caseId});
		if (project)
		switch( e.type ){
		case 'hearings' : 
				event_title = project.name;
				court = Courts.findOne(project.courtId);
				hearing = Hearings.findOne({_id : e.hearingId });
				hearings.push({
					title : 'Hearing:'+event_title+","+court.name,
					date : hearing.date,
					type : e.type,
					url : '/hearings/'+e.hearingId,
					className : 'hearing',
					color : court.color || null
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
					completed : completed,
					url : '/tasks/' + e.taskId
					//url : '/tasks/'+e.taskId
				});
			}
			break;
		case 'meetings' : 
			debugger;
			var meeting = Meetings.findOne({_id : e.meetingId});
			var allDay= true;
			var start, end;
			if ( meeting.startHour && meeting.endHour) {
				allDay = false;
				start = e.date; 
				start.setHours(meeting.startHour);
				end = e.date;
				end.setHours(meeting.startHour);
			}
			meetings.push({
				title : 'Meeting :'+project.name,
				date : e.date,
				type : e.type,
				url : '/meetings/'+e.meetingId, 
				className : 'meeting',
				allDay : allDay,
				start : start || null,
				end : end || null
			});
			break;
		}
	});

    var blockModeCheckbox = $(template.find("#blockMode"));

	calendar.fullCalendar({
		dayClick: function(date, allDay, jsEvent, view) {
            if(blockModeCheckbox.is(":checked")){
                Meteor.call('toggle_block_days', date);
                $(this).toggleClass('blocked');
            }
            else{
                calendar.fullCalendar('changeView', 'agendaDay');
                calendar.fullCalendar('gotoDate', date);
            }
    	},
    	dayRender : function( date, cell ) { 
    		//todo : optimise this !!!!! ASAPPPPP
    		if ( Events.findOne({ date : date , type : 'blocked', userIds : Meteor.userId() }) ) {
    			cell.addClass('blocked')
    		}
    		if ( Events.findOne({ date : date , type : 'court_holidays' }) ) {
    			cell.addClass('blocked')
    		}
    	},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek, agendaDay'
		}, 
		eventRender: function(event, element) {
			if (event.type == 'tasks'){
				// todo : rerender on switch view
				if ( event.completed ){
					element.find('.fc-event-title').css('text-decoration','line-through');
					//element.find('.fc-event-title').prepend('<input class="chk-complete" id='+event.task_id+' type="checkbox" checked>')
				}else{
					//element.find('.fc-event-title').prepend('<input class="chk-complete" id='+event.task_id+' type="checkbox">')
				}
			} else if (event.type == 'hearings' && event.color) {
				element.children().css('background',event.color);
				element.find('.fc-event-title').css('color',complement(event.color));
			}
	    },
	    viewRender : function( view, element ){
	    	debugger;
	    }
	});
	
	calendar.fullCalendar('removeEventSource', hearings);
	calendar.fullCalendar('removeEventSource', meetings);
	calendar.fullCalendar('removeEventSource', task_deadlines);

	calendar.fullCalendar( 'addEventSource', hearings);
	calendar.fullCalendar( 'addEventSource', meetings);
	calendar.fullCalendar( 'addEventSource', task_deadlines);

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
    'change #blockMode' : function(event, template){
        var calendar = $(template.find("#calendar"));
        var taskCheckBox = $(template.find("#tasks"));
        var hearingCheckBox = $(template.find("#hearings"));
        var meetingCheckBox = $(template.find("#meetings"));
        if(event.target.checked){
            calendar.fullCalendar('removeEventSource', task_deadlines);
            calendar.fullCalendar('removeEventSource', meetings);
            calendar.fullCalendar('removeEventSource', hearings);
            $([taskCheckBox[0], hearingCheckBox[0], meetingCheckBox[0]]).prop('disabled', true);
        }
        else{
            if(taskCheckBox.is(":checked"))
                calendar.fullCalendar('addEventSource', task_deadlines);
            if(hearingCheckBox.is(":checked"))
                calendar.fullCalendar('addEventSource', hearings);
            if(meetingCheckBox.is(":checked"))
                calendar.fullCalendar('addEventSource', meetings);
            $([taskCheckBox[0], hearingCheckBox[0], meetingCheckBox[0]]).prop('disabled', false);
        }
    },
	'click #modal_hearing' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		Router.go('addHearing');
	},
	'click #modal_meeting' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		Router.go('addMeeting');
	},
	'click #modal_task' : function(e){
		e.preventDefault();
		$('#modal1').closeModal();
		Router.go('addTask');
	},
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




