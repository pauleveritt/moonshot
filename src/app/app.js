var app = angular.module("moonshot", ["ui.router"]);


app.config(function ($stateProvider) {
  $stateProvider
    .state("home", {
             url: "/home",
             templateUrl: "app/home.partial.html"
           })
    .state("list", {
             url: "/list",
             templateUrl: "app/list.partial.html",
             controller: "ListCtrl",
             controllerAs: "ListCtrl"
           })
    .state("list.item", {
             url: "/:item",
             templateUrl: "app/list.item.partial.html",
             controller: "ListItemCtrl",
             controllerAs: "ListItemCtrl"
           })
});

app.controller("ListCtrl", function (ShoppingList) {
  var ctrl = this;
  this.shoppingList = ShoppingList;

  this.selectItem = function (selectedItem) {
    _.forEach(ctrl.shoppingList, function (item) {
      item.selected = false;
      if (selectedItem === item) {
        selectedItem.selected = true;
      }
    });
  };
});

app.controller("ListItemCtrl", function ($log, $stateParams) {
  this.item = $stateParams.item;
});

app.value("ShoppingList", [
  {name: "Milk"},
  {name: "Eggs"},
  {name: "Bread"},
  {name: "Cheese"},
  {name: "Ham"}
]);