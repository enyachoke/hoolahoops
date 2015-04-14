// TODO: Really ugly code here. It's late and i'm tired. Copy pasting. Need to remove this asap. haha LOL
  Template.projectDetails.helpers({  
    'lawyers': function() {
      var post = this;
      console.log("inside post", this);
      var cursor = Lawyers.find({_id: {$in:this.lawyerIds}});
      console.log(cursor.fetch());
      return cursor;
    },
    'clients': function() {
      var post = this;
      console.log("inside client helper", this);
	   ;
      return Clients.find({_id: {$in:this.clientIds}});
    },
    'court': function() {
      return Courts.findOne({_id: this.courtId});
    },
		'feed' : function() {
		
		(function(){
		  if (typeof Object.defineProperty === 'function'){
		    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
		  }
		  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

		  function sb(f){
		    for (var i=this.length;i;){
		      var o = this[--i];
		      this[i] = [].concat(f.call(o,o,i),o);
		    }
		    this.sort(function(b,a){
		      for (var i=0,len=a.length;i<len;++i){
		        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
		      }
		      return 0;
		    });
		    for (var i=this.length;i;){
		      this[--i]=this[i][this[i].length-1];
		    }
		    return this;
		  }
		})();
		var hearings = Hearings.find({ 'caseId' : this._id }).fetch();
		var meetings = Meetings.find({ 'caseId' : this._id }).fetch();
		var tasks = Tasks.find({ 'caseId' : this._id }).fetch();
		// var feed = hearings.concat( meetings, tasks);
		var feed = []
		hearings.forEach(function(h){
			feed.push({
				data : h,
				type : 'Hearing',
				desc : ":"+Meteor.users.findOne({_id : h.lawyerId}).name,
				date : h.date.format('{dd}-{month}-{yy}'),
				hearing : true
			});
		});
		meetings.forEach(function(h){
			feed.push({
				data : h,
				type : 'Meeting',
				desc : ":" + h.agenda,
				date: h.date.format('{dd}-{month}-{yy}')
			});
		})	
		tasks.forEach(function(h){
			feed.push({
				data : h,
				type : 'Task',
				desc : ":"+h.desc,
				date : h.date.format('{dd}-{month}-{yy}')
			});
		})

		debugger;
		return feed.sortBy(function(o){ return o.data.date });
	}
  });

  Template.projectDetails.events({
    'click .delete': function (event) {
      Projects.remove(this._id, function(){
        Router.go('projects');
      });
    }
  });