(function () {

  function ListCtrl(shoppingList) {
    this.context = shoppingList;
  }

  function ListItemCtrl(context) {
    this.context = context;
  }

  angular.module("moonshot")

    .controller("ListCtrl", ListCtrl)

    .controller("ListItemCtrl", ListItemCtrl)
})();