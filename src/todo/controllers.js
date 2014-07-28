(function () {

  function ListCtrl(shoppinglist) {
    var ctrl = this;
    ctrl.context = shoppinglist;
  }

  function ListItemCtrl(context) {
    this.context = context;
  }

  angular.module("moonshot")

    .controller("ListCtrl", ListCtrl)

    .controller("ListItemCtrl", ListItemCtrl)
})();