
var BasePage = require("../../../common/testingUtils.js");

function TodoPage() {
  BasePage.call(this);

  this.getShoppingList = function () {
    element(by.id("menu-list")).click();
  };

}

TodoPage.prototype = Object.create(BasePage.prototype);
TodoPage.prototype.constructor = TodoPage;

module.exports = TodoPage;