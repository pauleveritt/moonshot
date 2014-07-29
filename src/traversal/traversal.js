(function () {

  function Traverser() {
    this.x = 1;
  }

  function NotFoundCtrl($stateParams) {
    this.unfoundStateTo = $stateParams.unfoundStateTo;
  }

  function ErrorCtrl($stateParams) {
    this.toState = $stateParams.toState;
    this.error = $stateParams.error;
  }

  function ServiceConfig($urlRouterProvider, $stateProvider) {

    // Handle cases where the URL doesn't end in a slash, redirect
    // to slash
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.url();

      // check to see if the path already has a slash where it should be
      if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
        return;
      }

      if (path.indexOf('?') > -1) {
        return path.replace('?', '/?');
      }

      return path + '/';
    });

    // NotFound, Error, and Forbidden views
    $stateProvider.state("notfound", {
      parent: "siteroot",
      templateUrl: "traversal/notfound.partial.html",
      controller: NotFoundCtrl,
      controllerAs: "NotFoundCtrl",
      params: ["unfoundStateTo"]
    });
    $stateProvider.state("error", {
      parent: "siteroot",
      templateUrl: "traversal/error.partial.html",
      controller: ErrorCtrl,
      controllerAs: "ErrorCtrl",
      params: ["toState", "error"]
    });


  }

  angular.module("traversal", ["ui.router"])

    .service("Traverser", Traverser)
    .config(ServiceConfig)
    .run(function ($log, $rootScope, $state) {
           // Let's handle NotFound, Error, and Forbidden

           // Not Found. Tried to go to a state that doesn't exist
           $rootScope
             .$on(
             '$stateNotFound',
             function (event, unfoundState, fromState, fromParams) {
               event.preventDefault();
               $state.go("notfound", {unfoundStateTo: unfoundState.to});
             });

           // Error handler. Display errors that occur in state resolves etc.
           $rootScope
             .$on(
             '$stateChangeError',
             function (event, toState, toParams, fromState, fromParams, error) {
               event.preventDefault();
               $state.go("error", {toState: toState.name, error: error});
             });
         })

})();