if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function() {
    return describe("TCL-India", function() {
      return describe("insertLawyer", function() {
        return it("Insert a dummy lawyer", function() {
          var lawyerId;
          lawyerId = Lawyers.insert({
            name: "Test Lawyer",
            username: "test@lawyer.com",
            contactNumber: 1234567890
          });
          Session.set("selectedLawyer", lawyerId);
          return setTimeout((function() {
            // Lawyers.remove(lawyerId);
            return done();
          }), 100);
        });
      });
    });
  });
}
