/*

 To Test
 - Redirect when URL is #/
 - Not Found when it doesn't match
 - Various views and states via click
 - Listings

 */


var AppPage = require("./AppPage");

ddescribe("Moonshot", function () {

  var page = new AppPage();

  describe("Landing Home Page", function () {

    beforeEach(function () {
      page.getHome();
    });

    it("should display the correct title", function () {
      expect(page.getTitle()).toBe('Moonshot');
    });

    it("should display the correct brand", function () {
      var brand = page.getBrand();
      expect(brand.getText()).toBe("Moonshot");
    });

    it("should display the correct heading", function () {
      var heading = page.getHeading();
      expect(heading.getText()).toBe("What is ui-router?");
    });

    it("should mark the correct menu as active", function () {
      var activeMenu = page.activeMenu();
      expect(activeMenu.getText()).toBe("Home");
    });

    it('should not have an error', function () {
      page.getError().then(function (jserror) {
        expect(jserror).toBe(null);
      });
    });
  });

  describe("Follow second menu", function () {

    beforeEach(function () {
      page.getShoppingList();
    });

    it("should display the correct title", function () {
      expect(page.getTitle()).toBe('Moonshot');
    });

    it("should mark the correct menu as active", function () {
      var activeMenu = page.activeMenu();
      expect(activeMenu.getText()).toBe("Shopping List");
    });

    it('should not have an error', function () {
      page.getError().then(function (jserror) {
        expect(jserror).toBe(null);
      });
    });

  });

});
