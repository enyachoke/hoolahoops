AutoForm.hooks({
  	insertProjectForm: {
    onSuccess:function(operation, result, template){
        Router.go('projectDetails',{'_id':result});
    }},
    insertHearingForm : {
    onSuccess:function(operation, result, template){
        Router.go('hearingDetails',{'_id':result});
    }},
    insertMeetingForm : {
    onSuccess:function(operation, result, template){
        Router.go('meetingDetails',{'_id':result});
    }},
    insertTaskForm : {
    onSuccess:function(operation, result, template){
        Router.go('taskDetails',{'_id':result});
    }}


    // ,
    // onError: function(operation, error, template) {
    //     console.log(operation,error)
    // },
  
});