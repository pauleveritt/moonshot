(function () {

  function AppConfig($stateProvider) {

    // NotFound, Error, and Forbidden views
    $stateProvider
      .state("notfound", {
               parent: "siteroot",
               templateUrl: "traversal/notfound.partial.html",
               controller: "NotFoundCtrl as NotFoundCtrl",
               params: ["unfoundStateTo"]
             })
      .state("error", {
               parent: "siteroot",
               templateUrl: "traversal/error.partial.html",
               controller: "ErrorCtrl as ErrorCtrl",
               params: ["toState", "error"]
             });

  }

  angular.module("moonshot")
    .config(AppConfig);

})();

