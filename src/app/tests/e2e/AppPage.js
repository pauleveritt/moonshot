
var BasePage = require("../../../common/testingUtils.js");

function AppPage() {
  BasePage.call(this);

  this.getShoppingList = function () {
    element(by.id("menu-list")).click();
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

AppPage.prototype = Object.create(BasePage.prototype);
AppPage.prototype.constructor = AppPage;

module.exports = AppPage;