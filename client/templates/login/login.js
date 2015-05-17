Template.login.rendered = function() {
	// TODO: Really hacky solution to open form. Replace this with a full form template instead
	//$(this.find(".login-link-text")).click()
}

// TODO: Add google login
Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var passwordVar = template.find('#login-password').value;
        console.log("Form submitted.");
    }
});