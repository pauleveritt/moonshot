var AppPage = require("./AppPage");
var page = new AppPage();

describe("Home Page", function () {

  beforeEach(function () {
    page.get("/#/");
  });

  it("should display the correct title", function () {
    expect(page.getTitle()).toBe('Moonshot');
  });

  it("should display the correct url", function () {
    page.currentUrl().then(function (url) {
      expect(url).toBe("/");
    });
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
