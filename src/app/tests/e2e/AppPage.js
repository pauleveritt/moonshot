function ClobjectPage() {

  this.get = function () {
    browser.get("/src/index.html#/home");
    this.ptor = protractor.getInstance();
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

  this.getHeading = function () {
    return element(by.id("mshot-heading"));
  };

}

module.exports = ClobjectPage;