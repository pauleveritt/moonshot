
var BasePage = require("../../../common/testingUtils.js");

function AppPage() {
  BasePage.call(this);

  this.getBrand = function () {
    return element(by.css(".navbar-brand"));
  };

}

AppPage.prototype = Object.create(BasePage.prototype);
AppPage.prototype.constructor = AppPage;

module.exports = AppPage;