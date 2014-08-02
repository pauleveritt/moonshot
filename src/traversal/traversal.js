(function () {

  function Traverser() {
    this.x = 1;
  }

  function ServiceConfig($urlRouterProvider, $stateProvider) {

    // The traverser state is the base-most state
    $stateProvider
      .state("traverser", {
      abstract: true,
      template: '<ui-view id="traverser"></ui-view>',
      controller: "TraverserCtrl as TraverserCtrl"
    });

    $urlRouterProvider.rule(function ($injector, $location) {

      // Handle the case of going to index.html without #/
      if ($location.url() == "") {
        return "/";
      }

    });

  }

  angular.module("traversal", ["ui.router"])

    .service("Traverser", Traverser)
    .config(ServiceConfig)
    .run(
    function ($log, $rootScope, $state) {
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