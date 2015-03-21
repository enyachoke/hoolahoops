AutoForm.hooks({
  insertProjectForm: {
    onSuccess:function(operation, result, template){
        //debugger;
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
    // // formToDoc: function(doc) {
    //     debugger;
    // }
    // ,
    // onError: function(operation, error, template) {
    //     console.log(operation,error)
    // },
  
});