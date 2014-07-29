/*

 To Test
 - Redirect when URL is #/
 - Not Found when it doesn't match
 - Various views and states via click
 - Listings

 */


var AppPage = require("./AppPage");
var page = new AppPage();

describe("Shopping List", function () {

  beforeEach(function () {
    page.get("/src/");
    page.getShoppingList();
  });

  it("should display the correct title", function () {
    expect(page.getTitle()).toBe('Moonshot');
  });

  it("should display the correct url", function () {
    page.currentUrl().then(function (url) {
      expect(url).toBe("http://localhost:9000/src/#/list/");
    });
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
