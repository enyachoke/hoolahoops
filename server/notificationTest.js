Meteor.setInterval(function(){

    Push.send({
        from: 'testing',
        title: 'Hello',
        text: 'world',
        query: {
        } 
        
    });

},3000);

//testing send notification to all every 3 sec.


//sends to all

// use query : {userId : 'dsgagjasofasf'} to send to specific user