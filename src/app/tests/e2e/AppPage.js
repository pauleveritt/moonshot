function ClobjectPage() {

  this.ptor = protractor.getInstance();

  this.getHome = function () {
    browser.get("/src/");
  };

  this.getShoppingList = function () {
    browser.get("/src/");
    element(by.id("menu-list")).click();
  };

  this.currentUrl = function () {
    return this.ptor.getLocationAbsUrl();
  };

  this.isPresent = function (node) {
    return this.ptor.isElementPresent(node);
  };

  this.getError = function () {
    var body = element(by.tagName('body'));
    return body.getAttribute("data-jserror");
  };

  this.getTitle = function () {
    return browser.getTitle();
  };

  this.getBrand = function () {
    return element(by.css(".navbar-brand"));
  };

  this.activeMenu = function () {
    return element(by.css(".navbar-nav .active a"));
  };

  this.getHeading = function () {
    return element(by.id("heading"));
  };

}

module.exports = ClobjectPage;