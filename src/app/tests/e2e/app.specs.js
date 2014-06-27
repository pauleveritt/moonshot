var AppPage = require("./AppPage");

describe("Moonshot", function () {

  var page = new AppPage();

  beforeEach(function () {
    page.get();
  });

  describe("Landing Wrapper Page", function () {
    it("should display the correct title", function () {
      expect(page.getTitle()).toBe('Moonshot');
    });

    it('should not have an error', function () {
      page.getError().then(function (jserror) {
        expect(jserror).toBe(null);
      });
    });
  });

  describe("Landing Wrapper Page", function () {
    it("should display the correct title", function () {
      expect(page.getTitle()).toBe('Moonshot');
    });

    it('should not have an error', function () {
      page.getError().then(function (jserror) {
        expect(jserror).toBe(null);
      });
    });

  });

});
