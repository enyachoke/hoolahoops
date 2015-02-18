// Open a shell using meteor mongo
// Paste this code there



hearings = [
	{
		'title' : 'yo vs oyo',
		'court' : 'Delhi High Court',
		'proceedings' : 'case suspended',
		'date' : '12/12/12'
	}
]

clientData = [
	{'name': 'Shashwat Kumar'},
	{'name': 'Rishabh Saxena'},
	{'name': 'Shubham Agrawal'},
	{'name': 'Abhay Kumar'},
	{'name': 'Virender Kumar'},
	{'name': 'Vivek Joshi'},
	{'name': 'Suneedhi Parihas'},
	{'name': 'Ishtar Vineta'},
	{'name': 'Ashok Mishra'},
	{'name': 'Sanjay Nigam'}
]

lawyerData = [
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
	{'name': 'Superme Court of India', '_id': 'abcd1'},
	{'name': 'Bombay High Court', '_id': 'abcd11'},
	{'name': 'Delhi High Court', '_id': 'abcd12'},
	{'name': 'Patna High Court', '_id': 'abcd13'},
	{'name': 'High Court of Judicature at Hyderabad', '_id': 'ab4cd1'},
	{'name': 'High Court of Judicature at Allahabad', '_id': 'ab5cd1'},
	{'name': 'Calcutta High Court', '_id': 'abcd61'},
	{'name': 'Gauhati High Court', '_id': 'abcd71'},
	{'name': 'Gujrat High Court', '_id': 'abcd18'},
	{'name': 'Himachal Pradesh High Court', '_id': 'a9bcd1'},
	{'name': 'Jammu and Kashmir High Court', '_id': 'ab99cd1'},
	{'name': 'Jharkhand High Court', '_id': 'abcd121'},
	{'name': 'Madhya Pradesh High Court', '_id': 'ab34cd1'},
	{'name': 'Manipur High Court', '_id': 'abcd651'},
	{'name': 'Meghalaya High Court', '_id': 'abc21d1'},
	{'name': 'Orissa High Court', '_id': 'abcd1231'},
	{'name': 'Patna High Court', '_id': 'abcd12341'},
	{'name': 'Punjab and Haryana High Court', '_id': 'ab1235cd1'},
	{'name': 'Rajasthan High Court', '_id': 'abcd2135121'},
	{'name': 'Sikkim High Court', '_id': 'abcd34561'},
	{'name': 'Tripura High Court', '_id': 'abcd66471'},
	{'name': 'Uttarakhand High Court', '_id': 'abcd23451'}
]

//db.clients.insert(clientData)
//db.lawyers.insert(lawyerData)
//db.courts.insert(courts)