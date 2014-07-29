function BasePage() {
  this.ptor = protractor.getInstance();
}
BasePage.prototype.get = function (url) {
  browser.get(url);
};

BasePage.prototype.currentUrl = function () {
  return this.ptor.getLocationAbsUrl();
};


module.exports = BasePage;