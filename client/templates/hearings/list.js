Template.hearings.helpers({
	'hearings': function() {
	 // return Hearings.find();
	 debugger;
	 return Hearings.find();
	},
	settings: function () {
        return {
            collection: Hearings.find(),
            rowsPerPage: 10,
            showFilter: true,
            fields: [
            	'date',
            	'proceedings',
            	{
    				key: 'bill_amt',
    				label: 'Amount',
    				fn: function( value, object ){
    					return "Rs."+value;		
    				}
            	}
            ]
        };
    }
});

