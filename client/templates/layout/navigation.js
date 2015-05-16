Template.navigation.events({
	'click .logout': function(){
		Meteor.logout();
	},
	'click #change_password': function(event, template){
		var success_message_element = template.find("#success_message");
		var error_message_element = template.find("#error_message");
		var new_password = template.find('#new_password');
		success_message_element.innerHTML = error_message_element.innerHTML = "";
		if(new_password.value.length>=6){
			var current_password = template.find("#current_password");
			Meteor.loginWithPassword(Meteor.user().username, current_password.value, function(err){
				if(err)
					error_message_element.innerHTML = "Incorrect password";
				else{
					var confirm_new_password = template.find("#confirm_new_password");
					if(new_password.value == confirm_new_password.value){
						Accounts.changePassword(current_password.value, new_password.value);
						success_message_element.innerHTML = "Password changed";
						current_password.value = new_password.value = confirm_new_password.value = ""
					}
					else
						error_message_element.innerHTML = "Passwords don't match";
				}
			});
		}
		else
			error_message_element.innerHTML = "Password must be at least 6 characters long";
	},
	'click #dropdown-button': function(e, template){
		var activates = $(template.find('#account-dropdown'));
		var origin = $(template.find("#dropdown-button"));
		if ( origin[0] == e.currentTarget && ($(e.target).closest('.dropdown-content').length === 0) ) {
          e.preventDefault();
          if(activates.hasClass('active')){
          	origin.trigger('close');
          	$(document).unbind('click.' + activates.attr('id'));
          }
		  else
			origin.trigger('open');
        }
		if(activates.hasClass('active')){
			$(document).bind('click.'+ activates.attr('id'), function (e) {
	            if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length > 0) ) {
	              origin.trigger('close');
	              $(document).unbind('click.' + activates.attr('id'));
	            }
	        });
		}
	}
});
Template.navigation.rendered = function(){
	var template = this;
	$(document).ready(function(){
		$(".button-collapse").sideNav();
		$("a[data-activates='account-dropdown']").dropdown();
		$('#dropdown-button').unbind('click.dropdown-button');
		$('a[href="#changePassword"]').leanModal({
			complete: function(){
				template.find("#error_message").innerHTML = template.find("#success_message").innerHTML =
				template.find("#new_password").value = template.find("#confirm_new_password").value =
				template.find("#current_password").value = "";
			}
		});
	})
}