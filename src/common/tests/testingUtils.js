function BasePage() {
  this.ptor = protractor.getInstance();
}
BasePage.prototype.get = function (url) {
  browser.get(url);
};

BasePage.prototype.currentUrl = function () {
  return this.ptor.getLocationAbsUrl();
};

BasePage.prototype.isPresent = function (node) {
  return this.ptor.isElementPresent(node);
};

BasePage.prototype.getError = function () {
  var body = element(by.tagName('body'));
  return body.getAttribute("data-jserror");
};

BasePage.prototype.getTitle = function () {
  return browser.getTitle();
};

BasePage.prototype.activeMenu = function () {
  return element(by.css("#sections .active a"));
};

BasePage.prototype.getHeading = function () {
  return element(by.id("heading"));
};

module.exports = BasePage;