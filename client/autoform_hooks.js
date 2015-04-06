AutoForm.hooks({
    insertProjectForm: {
    onSuccess:function(operation, result, template){

        //create project root in google drive
        var project = Projects.findOne({_id : result });
        if ( project.driveFolderId ==undefined || project.driveFolderId == "" ){
            Meteor.call('insertFolder',{title: project.name, userId: Meteor.userId()},function(err,res){
                Projects.update({_id : result},{ $set :{ driveFolderId : res.result.id }});
            });
        }
        

        Router.go('projectDetails',{'_id':result});
    }},
    insertHearingForm : {
    onSuccess:function(operation, result, template){
        Router.go('hearingDetails',{'_id':result});
    }},
    insertMeetingForm : {
        // 'before': {
        //     method : function(){
        //         debugger;   
        //     }
        // },
        onSuccess:function(operation, result, template){
            Router.go('meetingDetails',{'_id':result});
        }
    },
    insertTaskForm : {
    onSuccess:function(operation, result, template){
        Router.go('taskDetails',{'_id':result});
    }},
    insertLawyerForm : {
    onSuccess:function(operation, result, template){
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