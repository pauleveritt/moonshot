var protractor;
describe("BasePage", function () {

  var ptor = {
    getLocationAbsUrl: function () {
      return "SomeURL";
    },
    isElementPresent: function () {
      return true;
    }
  };

  var basePage;
  beforeEach(function () {
    protractor = jasmine
      .createSpyObj("protractor", ["getInstance"]);
    protractor.getInstance.andReturn(ptor);
    browser = jasmine
      .createSpyObj(
      "browser",
      ["get", "getTitle"]);
    browser.get.andReturn();
    browser.getTitle.andReturn('sometitle');
    basePage = new BasePage();
  });

  it("should exist", function () {
    expect(basePage.ptor).toBeDefined();
  });

  it("should have a get", function () {
    expect(basePage.get()).not.toBeTruthy();
  });

  it("should have a currentUrl", function () {
    expect(basePage.currentUrl()).toBe("SomeURL");
  });

  it("should have a isPresent", function () {
    expect(basePage.isPresent()).toBeTruthy();
  });

  it("should have a getTitle", function () {
    expect(basePage.getTitle()).toBe('sometitle');
  });

});