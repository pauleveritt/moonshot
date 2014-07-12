/*

 To Test
 - Redirect when URL is #/
 - Not Found when it doesn't match
 - Various views and states via click
 - Listings

 */


var AppPage = require("./AppPage");

describe("Moonshot", function () {

  var page = new AppPage();

  beforeEach(function () {
    page.get();
  });

  describe("Landing Home Page", function () {

    it("should display the correct title", function () {
      expect(page.getTitle()).toBe('Moonshot');
    });

    it("should display the correct heading", function () {
      var heading = page.getHeading();
      expect(heading.getText()).toBe("What is ui-router?");
    });

    it('should not have an error', function () {
      page.getError().then(function (jserror) {
        expect(jserror).toBe(null);
      });
    });
  });

});
