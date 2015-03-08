Template.tasks.helpers({
	'tasks' : function(){
		return Tasks.find();
	}
});

Template.taskRow.events({
	'click #delete_task' : function(){
		Tasks.remove(this._id);
	}
});