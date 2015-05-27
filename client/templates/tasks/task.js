Template.tasks.helpers({
	'tasks' : function(){
		return Tasks.find();
	}
});

Template.taskRow.events({
	'click #delete_task' : function(){
		if(confirm("Confirm Delete?"))
			Meteor.call('removeTask', this._id, function(err, result){
				if(result)
					Materialize.toast('Task Deleted!', 1500);
			})
	}
});

Template.taskDetails.events({
	'click .Mark_As_Done' : function(){
		Tasks.update({ _id : this._id},{$set :{ 'completed' : true }});
	},
	'click .Mark_As_Incomplete' : function(){
		debugger;
		Tasks.update({ _id : this._id},{$set :{ 'completed' : false }});
	},
	'click .delete' : function(){
		if(confirm("Confirm Delete?")){
			var caseId = this.caseId;
			Meteor.call('removeTask', this._id, function(err, result){
				if(result)
					Router.go("/projects/" + caseId);
			})
		}
	}
	

});

Template.taskDetails.helpers({
	'formatted_date' : function (){
		return this.date.format('{dd}-{month}-{yy}');
	}
});

Template.addTask.rendered = function(){
	 $('.datepicker').pickadate({
    
 	 }	);
}

Template.addTask.helpers({
	'caseId' : function(){
		return this.project._id;
	}
});