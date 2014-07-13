var app = angular.module("moonshot", [
  "ngAnimate", "ui.router", "restangular"]);


app.config(function ($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state("root", {
             abstract: true,
             url: "",
             views: {
               "header": {
                 templateUrl: "header"
               },
               "content": {
                 templateUrl: "app/root.partial.html",
                 controller: "RootCtrl",
                 controllerAs: "RootCtrl"
               }
             }
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
               shoppinglist: function (Restangular) {
                 var baseShoppingList = Restangular.all('src/shoppinglist.json');
                 return baseShoppingList.getList().then(function (response) {
                   var data = {};
                   _.forEach(response, function (d) {
                     data[d.id] = d;
                   });
                   return data;
                 });
               }
             }
           })
    .state("list.item", {
             url: "/:itemId",
             templateUrl: "app/list.item.partial.html",
             controller: "ListItemCtrl as ListItemCtrl",
             resolve: {
               context: function (shoppinglist, $stateParams) {
                 /** @namespace $stateParams.itemId */
                 return shoppinglist[$stateParams.itemId];
               }
             }
           });

  $urlRouterProvider.otherwise('/home');
});

app.controller("RootCtrl", function ($scope) {
  $scope.site = {title: "Moonbeam"};
});

app.controller("ListCtrl", function (shoppinglist) {
  var ctrl = this;
  ctrl.context = shoppinglist;
});

app.controller("ListItemCtrl", function (context) {
  this.context = context;
});
