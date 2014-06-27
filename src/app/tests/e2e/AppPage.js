function ClobjectPage() {

  this.get = function () {
    browser.get("/src/index.html");
  };

  this.getError = function () {
    var body = element(by.tagName('body'));
    return body.getAttribute("data-jserror");
  };

  this.getTitle = function () {
    return browser.getTitle();
  };

}

module.exports = ClobjectPage;