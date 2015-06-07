Accounts.onCreateUser(function( options, user ){
    // TODO: Seems like really smelly code here. Refactor this.
    debugger;
  	if (user.services){
  		service = _.keys(user.services)[0];
      if (service == "google" || service == "facebook"){
        if( user.profile == undefined){
          user.profile = {};
        }
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
                  debugger;
                  if ( !user.profile ) {user.profile = {};}
                  user.profile.name = user.services[service].name
              } 
            }else{
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

    // Set username as email address
    if(user.emails)
      user.username = user.emails[0].address;

    if(options.email)
      delete options.email;

    // When the user is first signing up and creating a new firm as well
    if ( options.profile.team_name ){
      var teamId = Teams.insert({ 'name' : options.profile.team_name, 'userIds': []});
      user.teamId = teamId;
      delete options.profile.team_name;
    }

    for (var key in options) {
      console.log(key, options[key]);
      user[key] = options[key];
    }

    return user;
});