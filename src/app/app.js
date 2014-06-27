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
             controller: "ListCtrl"
           })
    .state("list.item", {
             url: "/:item",
             templateUrl: "app/list.partial.item.html",
             controller: function ($scope, $stateParams) {
               $scope.item = $stateParams.item;
             }
           })
});

app.controller("ListCtrl", function ($scope) {
  $scope.shoppingList = [
    {name: "Milk"},
    {name: "Eggs"},
    {name: "Bread"},
    {name: "Cheese"},
    {name: "Ham"}
  ];

  $scope.selectItem = function (selectedItem) {
    _($scope.shoppingList).each(function (item) {
      item.selected = false;
      if (selectedItem === item) {
        selectedItem.selected = true;
      }
    });
  };
});