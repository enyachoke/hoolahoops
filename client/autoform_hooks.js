AutoForm.hooks({
  insertProjectForm: {
    
    onSuccess:function(operation, result, template){
        debugger;
        //Router.go('projectDetails',{'_id':result});
    }
    // ,
    // // formToDoc: function(doc) {
    //     debugger;
    // }
    // ,
    // onError: function(operation, error, template) {
    //     console.log(operation,error)
    // },
  }
});