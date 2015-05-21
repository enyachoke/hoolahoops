if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function() {
    return describe("TCL-India", function() {
      return describe("insertProject", function() {
        return it("Insert a dummy project", function() {
          var projectId;
          projectId = Projects.insert({
            name: "TestProject1",
            ctype: "ALL",
            cno: "3",
            cyear: "2015",
            type: "audi",
            description: "this is a test project",
            clientIds: "deepank",
            courtId: "Delhi High Court",
            followup: '23 May, 2015',
            statute_of_limitation: '24 May, 2015',
            bill_retainer: 3,
            bill_hearing_partner: 4,
            bill_hearing_associate: 6,
            bill_hearing_sr_associate: 5,
            labelIds: ['very important']
          });
          Session.set("selectedProject", projectId);
          return setTimeout((function() {
            Projects.remove(projectId);
            return done();
          }), 100);
        });
      });
    });
  });
}
