taskSchema = new SimpleSchema({
	'date': {
		type: Date,
		label: 'Deadline',
		autoform: {
	      	type : "pickadate"  	
	    }
	},
	'desc': {
		type: String,
		label: 'Description'
	},
	'caseId': {
		type: String,
		label: 'case'
	},
	'eventIds': {
		optional: true,
		type: [String]
	},
	'completed': {
		optional: true,
		type: Boolean
	},
	'reminders': {
		type: [Object],
		optional: true
	},
	"reminders.$.date": {
		type: Date,
		autoform: {
			type: 'datetime-local'
		}
	},
	"reminders.$.email": {
		type: String,
		autoform: {
			type: "selectize",
			options: getUserOptions
		}
	},
	'userIds': {
	    type: [String],
	    label: 'Lawyers'
  	}
});

Tasks = new Meteor.Collection('tasks');
Tasks.attachSchema(taskSchema);

Tasks.helpers({
  lawyers: function(){
    // TODO: Test performance here
    return Meteor.users.find({_id: {$in:this.userIds}}, {transform: transformUserForMandrill}).fetch();
  },
  subject: function(){
  	var project = this.project();
  	return sprintf('[%s] reminder for task: [%s]', project._id, this.desc);
  },
  project: function(){
  	return Projects.findOne({_id: this.caseId});
  },
  deadline: function(daysBefore){
    return new Date(this.date - daysBefore);
  }
});