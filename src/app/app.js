var app = angular.module("moonshot", ["ui.router"]);


app.config(function ($stateProvider) {
  $stateProvider
    .state("root", {
             abstract: true,
             url: "",
             templateUrl: "app/root.partial.html",
             controller: "RootCtrl",
             controllerAs: "RootCtrl"
           })
    .state("home", {
             url: "/home",
             parent: "root",
             templateUrl: "app/home.partial.html"
           })
    .state("list", {
             url: "/list",
             parent: "root",
             templateUrl: "app/list.partial.html",
             controller: "ListCtrl as ListCtrl",
             resolve: {
               context: function (ShoppingList) {
                 return ShoppingList;
               }
             }
           })
    .state("list.item", {
             url: "/:itemId",
             templateUrl: "app/list.item.partial.html",
             controller: "ListItemCtrl as ListItemCtrl",
             resolve: {
               context: function (ShoppingList, $stateParams) {
                 return ShoppingList[$stateParams.itemId];
               }
             }
           })
});

app.controller("RootCtrl", function ($scope) {
  $scope.site = {title: "Moonbeam"};
});

app.controller("ListCtrl", function (context) {
  var ctrl = this;
  ctrl.context = context;
});

app.controller("ListItemCtrl", function (context) {
  this.context = context;
});

app.value("ShoppingList", {
            i1: {id: "i1", title: "Milk"},
            i2: {id: "i2", title: "Eggs"},
            i3: {id: "i3", title: "Bread"},
            i4: {id: "i4", title: "Cheese"},
            i5: {id: "i5", title: "Ham"}
          }
);