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
    }},
    insertLawyerForm : {
    onSuccess:function(operation, result, template){

        debugger;
        Router.go('lawyerDetails',{'_id':result});
    }},
    insertClientForm : {
    onSuccess:function(operation, result, template){
        Router.go('clientDetails',{'_id':result});
    }},
    insertCourtForm : {
    onSuccess:function(operation, result, template){
        Router.go('courts',{'_id':result});
    }},
    insertTimesheetForm : {
    onSuccess:function(operation, result, template){
        Router.go('timesheets',{'_id':result});
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