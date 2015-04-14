projectSchema = new SimpleSchema({
  name: {
    type: String
  },
  ctype: {
    type: String,
    autoform: {
      options: [{"label":"ALL","value":"ALL"},{"label":"APPEAL(ARB.) - [AARB]","value":"APPEAL(ARB.)"},{"label":"ARB.P. - [AA]","value":"ARB.P."},{"label":"AW - [AW]","value":"AW"},{"label":"BAIL APPLN. - [BAILA]","value":"BAIL APPLN."},{"label":"C.O. - [XOBJ]","value":"C.O."},{"label":"C.O. - [CO]","value":"C.O."},{"label":"C.R.P. - [CR]","value":"C.R.P."},{"label":"C.RULE - [CRULE]","value":"C.RULE"},{"label":"CA - [CAV]","value":"CA"},{"label":"CAVEAT(CO.) - [CAVE]","value":"CAVEAT(CO.)"},{"label":"CCP(CO.) - [CCPCO]","value":"CCP(CO.)"},{"label":"CCP(O) - [CCPO]","value":"CCP(O)"},{"label":"CCP(REF) - [CCPRF]","value":"CCP(REF)"},{"label":"CEAC - [CEAC]","value":"CEAC"},{"label":"CEAR - [CEAR]","value":"CEAR"},{"label":"CF - [CF]","value":"CF"},{"label":"CHAT.A.C. - [CHAC]","value":"CHAT.A.C."},{"label":"CHAT.A.REF - [CHAR]","value":"CHAT.A.REF"},{"label":"CM APPL. - [CM2]","value":"CM APPL."},{"label":"CM APPL. - [CM1]","value":"CM APPL."},{"label":"CM(M) - [CMM]","value":"CM(M)"},{"label":"CMI - [CMI]","value":"CMI"},{"label":"CO.A(SB) - [CO.A]","value":"CO.A(SB)"},{"label":"CO.APP. - [COA]","value":"CO.APP."},{"label":"CO.APPL. - [CA]","value":"CO.APPL."},{"label":"CO.APPL.(C) - [CA(C)]","value":"CO.APPL.(C)"},{"label":"CO.APPL.(M) - [CA(M)]","value":"CO.APPL.(M)"},{"label":"CO.EX. - [CO.EX]","value":"CO.EX."},{"label":"CO.PET. - [CP]","value":"CO.PET."},{"label":"CONT.APP.(C) - [CCA]","value":"CONT.APP.(C)"},{"label":"CONT.CAS(C) - [CCP]","value":"CONT.CAS(C)"},{"label":"CONT.CAS.(CRL) - [CRLCP]","value":"CONT.CAS.(CRL)"},{"label":"CRL.A. - [CRLA]","value":"CRL.A."},{"label":"CRL.C.REF. - [CRLCR]","value":"CRL.C.REF."},{"label":"CRL.L.P. - [CRLMA]","value":"CRL.L.P."},{"label":"CRL.M.(BAIL) - [CRLMB]","value":"CRL.M.(BAIL)"},{"label":"CRL.M.(CO.) - [CRLMC]","value":"CRL.M.(CO.)"},{"label":"CRL.M.A. - [CRLM]","value":"CRL.M.A."},{"label":"CRL.M.C. - [CRLMM]","value":"CRL.M.C."},{"label":"CRL.M.I. - [CRLMI]","value":"CRL.M.I."},{"label":"CRL.O. - [CRLO]","value":"CRL.O."},{"label":"CRL.O.(CO.) - [CRLOC]","value":"CRL.O.(CO.)"},{"label":"CRL.REF. - [CRLRF]","value":"CRL.REF."},{"label":"CRL.REV.P. - [CRLR]","value":"CRL.REV.P."},{"label":"CS(OS) - [S]","value":"CS(OS)"},{"label":"CUS.A.C. - [CUSAC]","value":"CUS.A.C."},{"label":"CUS.A.R. - [CUSAR]","value":"CUS.A.R."},{"label":"CUSTOM A. - [CUSAA]","value":"CUSTOM A."},{"label":"DEATH SENTENCE REF. - [MREF]","value":"DEATH SENTENCE REF."},{"label":"EDA - [EDA]","value":"EDA"},{"label":"EDC - [EDC]","value":"EDC"},{"label":"EDR - [EDR]","value":"EDR"},{"label":"EFA(OS) - [EFAOS]","value":"EFA(OS)"},{"label":"EL.PET. - [EP]","value":"EL.PET."},{"label":"ETR - [ETR]","value":"ETR"},{"label":"EX.APPL.(OS) - [EA]","value":"EX.APPL.(OS)"},{"label":"EX.F.A. - [EFA]","value":"EX.F.A."},{"label":"EX.P. - [EX]","value":"EX.P."},{"label":"EX.S.A. - [ESA]","value":"EX.S.A."},{"label":"FAO - [FAO]","value":"FAO"},{"label":"FAO(OS) - [FAOOS]","value":"FAO(OS)"},{"label":"GCAC - [GCAC]","value":"GCAC"},{"label":"GCAR - [GCAR]","value":"GCAR"},{"label":"GTA - [GTA]","value":"GTA"},{"label":"GTC - [GTC]","value":"GTC"},{"label":"GTR - [GTR]","value":"GTR"},{"label":"I.A. - [IA]","value":"I.A."},{"label":"I.P.A. - [IPA]","value":"I.P.A."},{"label":"ITA - [ITA]","value":"ITA"},{"label":"ITC - [ITC]","value":"ITC"},{"label":"ITR - [ITR]","value":"ITR"},{"label":"ITSA - [ITSA]","value":"ITSA"},{"label":"LA.APP. - [LAA]","value":"LA.APP."},{"label":"LPA - [LPA]","value":"LPA"},{"label":"MAC.APP. - [MACA]","value":"MAC.APP."},{"label":"MAT. - [MAT]","value":"MAT."},{"label":"MAT.APP. - [MATA]","value":"MAT.APP."},{"label":"MAT.CASE - [MATC]","value":"MAT.CASE"},{"label":"MAT.REF. - [MATR]","value":"MAT.REF."},{"label":"NA - [NA]","value":"NA"},{"label":"O.A. - [OA]","value":"O.A."},{"label":"O.M.P. - [OMP]","value":"O.M.P."},{"label":"O.M.P.(E) - [OE]","value":"O.M.P.(E)"},{"label":"O.M.P.(I) - [OI]","value":"O.M.P.(I)"},{"label":"O.M.P.(T) - [OMPT]","value":"O.M.P.(T)"},{"label":"O.REF. - [CRF]","value":"O.REF."},{"label":"OBJ. IN SUIT - [OBJ]","value":"OBJ. IN SUIT"},{"label":"OCJA - [OCJA]","value":"OCJA"},{"label":"OD - [OD]","value":"OD"},{"label":"OLR - [OLR]","value":"OLR"},{"label":"R.A. - [RA]","value":"R.A."},{"label":"RC.REV. - [RCR]","value":"RC.REV."},{"label":"RC.S.A. - [SAO]","value":"RC.S.A."},{"label":"REVIEW PET. - [RP]","value":"REVIEW PET."},{"label":"RFA - [RFA]","value":"RFA"},{"label":"RFA(OS) - [RFAOS]","value":"RFA(OS)"},{"label":"RSA - [RSA]","value":"RSA"},{"label":"SCA - [SCA]","value":"SCA"},{"label":"SDR - [SDR]","value":"SDR"},{"label":"ST.APPL. - [STC]","value":"ST.APPL."},{"label":"ST.REF. - [STR]","value":"ST.REF."},{"label":"SUR.T.REF. - [SRTR]","value":"SUR.T.REF."},{"label":"TEST.CAS. - [PR]","value":"TEST.CAS."},{"label":"TR.P.(C) - [TRP]","value":"TR.P.(C)"},{"label":"TR.P.(C.) - [TPC]","value":"TR.P.(C.)"},{"label":"TR.P.(CRL.) - [TPCRL]","value":"TR.P.(CRL.)"},{"label":"W.P.(C) - [CW]","value":"W.P.(C)"},{"label":"W.P.(CRL) - [CRLW]","value":"W.P.(CRL)"},{"label":"WTA - [WTA]","value":"WTA"},{"label":"WTC - [WTC]","value":"WTC"},{"label":"WTR - [WTR]","value":"WTR"}]
    }
  },
  cno: {
    type: String
  },
  cyear: {
    type: String
  },
  type: {
    type: String,
    // optional: true,
    label: 'Type of case',
    allowedValues: ['audi', 'business', 'criminal', 'civil', 'commercial', 'corporate', 'family', 'immigration', 'insurance', 'personalinjury', 'tax']
    // TODO: Provide labels here
  },
  description: {
    type: String,
    optional: true,
    label: 'Case Description'
  },
  clientIds: {
    optional: true,
    type: [String],
    label: 'Clients'
  },
  lawyerIds: {
    // optional: true,
    type: [String],
    label: 'Lawyers'
  },
  courtId: {
    type: String,
    label: 'Court'
  },
  followup: {
	// optional: true,
  	type : Date,
	label : 'Followup Date'
  },
  statute_of_limitation: {
	  // optional: true,
    type : Date,
	  label : 'Statute of Limitation'
  },
  bill_retainer : {
	  optional: true,
	  type : Number,
	  label : 'Retainer'
  },
  bill_hearing_partner : {
	  optional: true,
	  type : Number,
	  label : 'Partner'
  },
  bill_hearing_associate : {
	  optional: true,
	  type : Number,
	  label : 'Associate'
  },
  bill_hearing_sr_associate : {
	  optional: true,
	  type : Number,
	  label : 'Sr. Associate'
  },

  reminders: {
    type: [Object],
    optional: true
  },

  "reminders.$.date": {
    type: Date,
    autoform: {
      type: 'datetime-local'
    }
  },

  // "reminders.$.type": {
  //   type: String,
  //   label: 'Type of reminder',
  //   allowedValues: ['matter-created', 'matter-updated', 'stat']
  // },
  "reminders.$.email": {
    type: String,
    autoform: {
      type: "selectize",
      options: function(){
        var options = [];
        var lawyers = Lawyers.find().fetch();
        _.each(lawyers, function(element){
          options.push({
            label: element.name,
            value: element.email
          });
        });
       // debugger;
        return options;
      }
    }
  },
  hearingIds : {
    optional : true,
    type : [String]
  },
  meetingIds : {
    optional : true,
    type : [String]
  },
  taskIds : {
    optional : true,
    type : [String]
  },
  eventIds : {
    optional : true,
    type : [String]
  },
  billIds : {
    optional : true,
    type : [String]
  },
  timesheetIds : {
    optional : true,
    type : [String]
  },
  uniqueId : {
    unique: true,
    type : String,
    optional : true
  },
  driveFolderId : {
    unique : true,
    type : String,
    optional : true
  },
  orderIds: {
    optional: true,
    type: [String],
    defaultValue: []
  },
  labelIds: {
    type: [String],
    optional: true,
    autoform: {
      type: "selectize",
      options: function() {
        var options = [];
        var labels = Labels.find().fetch();
        _.each(labels, function(element){
          options.push({
            label: element.name,
            value: element._id,
            data: element
          });
        });
        return options;
      },
      afFieldInput: {
        multiple: false,
        isReactiveOptions: true,
        selectizeOptions: {
          maxItems: null,
          render: {
            item: function(item, escape) {
                return Blaze.toHTMLWithData(Template.colorElement, item.data);
            },
            option: function(item, escape) {
                return Blaze.toHTMLWithData(Template.colorElement, item.data);
            }
          }
        }
      }
    }
  }

});

Projects = new Meteor.Collection('projects')
Projects.attachSchema(projectSchema);

// Collection helpers
Projects.helpers({
  labels: function(){
    return Labels.find({_id: {$in:this.labelIds}}).fetch();
  },
  orders: function(){
    return Orders.find({_id: {$in:this.orderIds}}).fetch();
  },
  lawyers: function(){
    // TODO: Test performance here
    return Lawyers.find({_id: {$in:this.lawyerIds}}).fetch();
  },
  clients: function(){
    // TODO: Test performance here
    return Clients.find({_id: {$in:this.clientIds}}).fetch();
  },
  // TODO: Make this configurable
  reminderFollowUpDate: function(){
    return new Date(this.followup - 1);
  },
  reminderStatuteDate: function(){
    return new Date(this.statute_of_limitation - 7);
  },
  insertOrders: function(orders){
    var ids = [];
    for(var i=0; i<orders.length; i++){
      var id = Orders.insert(orders[i]);
      ids.push(id);
    }
    // Do not trigger update event in collection hook. Otherwise results in infinite loop of updates
    Projects.direct.update({_id: this._id}, {$set: {orderIds: ids}});
  }
})

EasySearch.createSearchIndex('projects', {
  'collection': Projects,
  'field': ['name', 'uniqueId', 'suitno'],
  'use' : 'mongo-db',
  'props': {
    'lawyers': false,
    'clients': false,
    'courtId': false,
    'type': false,
  },
  'query': function(searchString, opts) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    
    if(this.props.lawyers)
      query.lawyerIds = {$in: [this.props.lawyers]};
    if(this.props.clients)
      query.clientIds = {$in: [this.props.clients]};
    if(this.props.type)
      query.type = this.props.type;
    if(this.props.courtId)
      query.courtId = this.props.courtId;
    
    return query;
  }
});