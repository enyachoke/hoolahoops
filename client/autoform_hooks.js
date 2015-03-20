AutoForm.hooks({
  insertProjectForm: {
    onSuccess:function(operation, result, template){
        Router.go('projectDetails',{'_id':result});
    }
    // ,
    // onError: function(operation, error, template) {
    //     console.log(operation,error)
    // },
  }
});