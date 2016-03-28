##HoolaHoops: Open Source Practice Management For Lawyers

##Leaving todo comments
  If you are unable to do something, leave todo comments in the format //TODO: Something to do here.
  These comments will be picked up by our parser to generate todos

##Default user with all admin credentials to test out app with
email: 'shashwat@dinasource.com', password: 'adminuser987654321'

##Structure
*  server specific code in server
*  client specific code in client
*  lib contains stuff like definition of collections etc
*  each folder will have common helpers which contain common functions relevant to them
*  client/templates folder contain templates of the meteor app and their helpers, events etc

##Code Quality
Please try to keep the code as clean as possible. Avoid duplicating code whereever possible and keep your code dry.

##Working on a feature/issue
First of checkout dev and create a new branch from that. The branch should have a name like 20_implement_labels. Then after you are finished working on your issue, pull and merge dev into your branch again and then push your branch. After this see the testing section.

##Testing
Please add the steps to test your feature in this document: https://github.com/rishabhsaxena/hoolahoops/wiki/Testing

## Help
Please drop a mail to thegreatshasha@gmail.com
