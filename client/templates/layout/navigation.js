Template.navigation.events({
	'click .logout': function(){
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
	},
	'click #dropdown-button': function(e){
		var activates = $('#account-dropdown');
		var origin = $("#dropdown-button");
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