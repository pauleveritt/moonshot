(function () {

  function MoonshotConfig($stateProvider, moonMockRestProvider) {


    $stateProvider
      .state("list", {
               url: "/list",
               parent: "siteroot",
               templateUrl: "todo/list.partial.html",
               controller: "ListCtrl as ListCtrl",
               section: {
                 title: "To Do"
               },
               resolve: {
                 shoppingList: function (Restangular) {
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
                 context: function (shoppingList, $stateParams) {
                   /** @namespace $stateParams.itemId */
                   return shoppingList[$stateParams.itemId];
                 }
               }
             });

    var todoData = [
      {
        "id": "i1",
        "title": "Milk"
      },
      {
        "id": "i2",
        "title": "Eggs"
      },
      {
        "id": "i3",
        "title": "Bread"
      },
      {
        "id": "i4",
        "title": "Cheese"
      },
      {
        "id": "i5",
        "title": "Ham"
      }
    ];
    moonMockRestProvider.addMock(
      "todo",
      [
        [/api\/todos$/, function () {
          return [200, todoData];
        }]
      ]);

  }

  angular.module("moonshot")
    .config(MoonshotConfig);

})();

