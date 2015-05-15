Template.navigation.events({
	'click #logout': function(){
		Meteor.logout();
	},
	'click #change_password': function(){
		$("#success_message, #error_message").text("");
		if($("#new_password").val().length>=6){
			Meteor.loginWithPassword(Meteor.user().username, $("#current_password").val(), function(err){
				if(err)
					$("#error_message").text("Incorrect password");
				else
					if($("#new_password").val()==$("#confirm_new_password").val()){
						Accounts.changePassword($("#current_password").val(), $("#new_password").val());
						$("#success_message").text("Password changed");
						$("#current_password, #confirm_new_password, #new_password").val("");
					}
					else
						$("#error_message").text("Passwords don't match");
			})
		}
		else
			$("#error_message").text("Password must be at least 6 characters long");
	}
});
Template.navigation.rendered = function(){
	$(document).ready(function(){
		$(".button-collapse").sideNav();
		$("a[data-activates='account-dropdown']").dropdown();
		$('a[href="#changePassword"]').leanModal();
	})
}