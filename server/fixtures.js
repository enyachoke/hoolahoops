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
	{'name': 'Shashwat Kumar', '_id': '121'},
	{'name': 'Rishabh Saxena', '_id': '122'},
	{'name': 'Shubham Agrawal', '_id': '123'},
	{'name': 'Abhay Kumar', '_id': '124'},
	{'name': 'Virender Kumar', '_id': '125'},
	{'name': 'Vivek Joshi', '_id': '126'},
	{'name': 'Suneedhi Parihas', '_id': '127'},
	{'name': 'Ishtar Vineta', '_id': '128'},
	{'name': 'Ashok Mishra', '_id': '129'},
	{'name': 'Sanjay Nigam', '_id': '130'}
]

lawyers = [
	{'name': 'Shashwat Kumar', '_id': '1'},
	{'name': 'Rishabh Saxena', '_id': '2'},
	{'name': 'Shubham Agrawal', '_id': '3'},
	{'name': 'Abhay Kumar', '_id': '45'},
	{'name': 'Virender Kumar', '_id': '46'},
	{'name': 'Vivek Joshi', '_id': '47'},
	{'name': 'Suneedhi Parihas', '_id': '48'},
	{'name': 'Ishtar Vineta', '_id': '488'},
	{'name': 'Ashok Mishra', '_id': '49'},
	{'name': 'Sanjay Nigam', '_id': '41'}
]

// Possibly a type variable here
courts = [
	{'name': 'Superme Court of India', '_id': 'abcd1', 'code' : 'SC'},
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

// DEFAULT DATA
// TODO: Move all of this into a separate migrations
// Insert into db. TODO: Move this into helper functions and remove repetition
_.each(clients, function(client){
	//if(!Clients.findOne(client._id))
		Clients.upsert(client['_id'], {$set: client});
});

_.each(lawyers, function(lawyer){
	//if(!Lawyers.findOne(lawyer._id))
		Lawyers.upsert(lawyer['_id'], {$set: lawyer});
});

_.each(courts, function(court){
	//if(!Clients.findOne(court._id))
		Courts.upsert(court['_id'], {$set: court});
});