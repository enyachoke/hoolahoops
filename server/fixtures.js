/* Fixture for team */
if(!Teams.find().count()){
	var team = { 'teamId' : Teams.insert({ 'name' : 'CloudVakil', 'userIds': []}) };	
}
else{
	var team = { 'teamId' : Teams.findOne()._id };
}

// Initial setup for meteor user
	Meteor.user = function(){
		return Meteor.users.findOne();
	}

/* Create a default user */
if ( Meteor.users.find().count() === 0 ) {
	var user = _.extend({
        username: 'adminuser123456789',
        email: 'shashwat@dinasource.com',
        password: 'adminuser987654321',
        profile: {
            first_name: 'Admin',
            last_name: 'Admin',
            company: 'CloudVakil',
        }
    }, team);
	
	//debugger;
	var userId = Accounts.createUser(user);

	Roles.addUsersToRoles(userId, getAllRolesTags());
    log.info("\n\n\n\n\n\nAdding admin user\n\n\n\n\n\n");
}

debugger;

// Default data to insert
hearings = [
	{
		'title' : 'yo vs oyo',
		'court' : 'Delhi High Court',
		'proceedings' : 'case suspended',
		'date' : '12/12/12'
	}
]

clients = [
	{'name': 'Shashwat Kumar', '_id': '121', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Rishabh Saxena', '_id': '122', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Shubham Agrawal', '_id': '123', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Abhay Kumar', '_id': '124', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Virender Kumar', '_id': '125', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Vivek Joshi', '_id': '126', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Suneedhi Parihas', '_id': '127', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Ishtar Vineta', '_id': '128', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Ashok Mishra', '_id': '129', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Sanjay Nigam', '_id': '130', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"}
]

lawyers = [
	{'name': 'Shashwat Kumar', '_id': '1', "phone" : 9561905813, "email" : "shashwat@dinasource.com"},
	{'name': 'Rishabh Saxena', '_id': '2', "phone" : 9561905813, "email" : "thegreatshasha@gmail.com"},
	{'name': 'Shubham Agrawal', '_id': '3', "phone" : 9561905813, "email" : "thegreatshasha1@gmail.com"},
	{'name': 'Abhay Kumar', '_id': '45', "phone" : 9561905813, "email" : "thegreatshasha2@gmail.com"},
	{'name': 'Virender Kumar', '_id': '46', "phone" : 9561905813, "email" : "thegreatshasha3@gmail.com"},
	{'name': 'Vivek Joshi', '_id': '47', "phone" : 9561905813, "email" : "thegreatshasha4@gmail.com"},
	{'name': 'Suneedhi Parihas', '_id': '48', "phone" : 9561905813, "email" : "thegreatshasha5@gmail.com"},
	{'name': 'Ishtar Vineta', '_id': '488', "phone" : 9561905813, "email" : "thegreatshasha6@gmail.com"},
	{'name': 'Ashok Mishra', '_id': '49', "phone" : 9561905813, "email" : "thegreatshasha7@gmail.com"},
	{'name': 'Sanjay Nigam', '_id': '41', "phone" : 9561905813, "email" : "thegreatshasha8@gmail.com"}
]

// Possibly a type variable here
courts = [
	{'name': 'Supreme Court of India', '_id': 'abcd1', 'code' : 'SC'},
	{'name': 'Bombay High Court', '_id': 'abcd11', 'code' : 'BHC'},
	{'name': 'Delhi High Court', '_id': 'abcd12', 'code' : 'DHC'},
	{'name': 'Patna High Court', '_id': 'abcd13', 'code' : 'PHC'},
	{'name': 'High Court of Judicature at Hyderabad', '_id': 'ab4cd1', 'code' : 'Hyd'},
	{'name': 'High Court of Judicature at Allahabad', '_id': 'ab5cd1', 'code' : 'AA'},
	{'name': 'Calcutta High Court', '_id': 'abcd61', 'code' : 'CHC'},
	{'name': 'Gauhati High Court', '_id': 'abcd71', 'code' : 'GW-HC'},
	{'name': 'Himachal Pradesh High Court', '_id': 'a9bcd1','code' : 'H-HC'},
	{'name': 'Jammu and Kashmir High Court', '_id': 'ab99cd1', 'code' : 'JK-HC'},
	{'name': 'Jharkhand High Court', '_id': 'abcd121', 'code' : 'JH-HC'},
	{'name': 'Madhya Pradesh High Court', '_id': 'ab34cd1', 'code' : 'MP-HC'},
	{'name': 'Manipur High Court', '_id': 'abcd651', 'code' : 'M-HC'},
	{'name': 'Meghalaya High Court', '_id': 'abc21d1', 'code' : 'ME-HC'},
	{'name': 'Orissa High Court', '_id': 'abcd1231', 'code' : 'O-HC'},
	{'name': 'Patna High Court', '_id': 'abcd12341', 'code' : 'Patna-HC'},
	{'name': 'Punjab and Haryana High Court', '_id': 'ab1235cd1', 'code' : 'PNH-HC'},
	{'name': 'Rajasthan High Court', '_id': 'abcd2135121', 'code' : 'RHC'},
	{'name': 'Sikkim High Court', '_id': 'abcd34561', 'code' : 'S-HC'},
	{'name': 'Tripura High Court', '_id': 'abcd66471', 'code' : 'T-HC'},
	{'name': 'Uttarakhand High Court', '_id': 'abcd23451', 'code' : 'U-HC'}
]

a= [
[2015,1,1],
[2015,1,4],
[2015,1,26],
[2015,2,17],
[2015,3,6],
[2015,3,28],
[2015,4,2],
[2015,4,3],
[2015,5,4],
[2015,7,18],
[2015,8,15],
[2015,8,29],
[2015,9,5],
[2015,9,25],
[2015,10,2],
[2015,10,21],
[2015,10,22],
[2015,10,24],
[2015,10,27],
[2015,11,11],
[2015,11,12],
[2015,11,13],
[2015,11,25],
[2015,12,24],
[2015,12,25]
];

if ( Events.find({type : 'court_holidays'}).fetch().length ==0  ){
	_.each(a,function(date){
		var event = _.extend({ date : new Date(date), type : 'court_holidays' }, team);
		Events.insert(event);
	})
}


// DEFAULT DATA
// TODO: Move all of this into a separate migrations
// Insert into db. TODO: Move this into helper functions and remove repetition
// _.each(clients, function(client){
// 	//if(!Clients.findOne(client._id))
// 		Clients.upsert(client['_id'], {$set: client});
// });

// _.each(lawyers, function(lawyer){
// 	//if(!Lawyers.findOne(lawyer._id))
// 		Lawyers.upsert(lawyer['_id'], {$set: lawyer});
// });

_.each(courts, function(court){
	//if(!Clients.findOne(court._id))
	Courts.upsert(court['_id'], {$set: _.extend(court, team)});
});

//log.info("\n\n\n\n\n\nAdding admin user outside log: " + Meteor.users.find().count() + "\n\n\n\n\n\n");

delete Meteor.user