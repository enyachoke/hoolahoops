Accounts.onCreateUser(function( options, user ){
  	if( user.profile == undefined){
  		user.profile = {};
  	}
  	if (user.services){
  		service = _.keys(user.services)[0];
  		email = user.services[service].email;
  		if (email){
  		  	oldUser = Meteor.users.findOne({"emails.address": email});
  		  	if (oldUser){
  		  		if (oldUser.services == undefined){
  		  			oldUser.services = {};
  		  		}
  		  		if (service == "google" || service == "facebook"){
  		  			oldUser.services[service] = user.services[service];
          			Meteor.users.remove(oldUser._id);
          			user = oldUser
          			user.profile.name = user.services[service].name
  		  		}	
  		  	}else{
  		  		if (service == "google" || service == "facebook"){
  		  			if (user.services[service].email){
  		  				user.emails = [{address: user.services[service].email, verified: true}]
  		  			}else{
  		  				throw new Meteor.Error(500, "#{service} account has no email attached")
  		  			}
            		user.profile.name = user.services[service].name
          		}
  		  	}
  		}
  	}
  	return user;
});