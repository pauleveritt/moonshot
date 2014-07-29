(function () {

  function AppConfig($stateProvider) {

    $stateProvider
      .state("list", {
               url: "/list",
               parent: "siteroot",
               templateUrl: "todo/list.partial.html",
               controller: "ListCtrl as ListCtrl",
               resolve: {
                 shoppinglist: function (Restangular) {
                   var baseShoppingList = Restangular.all('todos');
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
               templateUrl: "todo/list.item.partial.html",
               controller: "ListItemCtrl as ListItemCtrl",
               resolve: {
                 context: function (shoppinglist, $stateParams) {
                   /** @namespace $stateParams.itemId */
                   return shoppinglist[$stateParams.itemId];
                 }
               }
             });

  }

  angular.module("moonshot")
    .config(AppConfig);

})();

