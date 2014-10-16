(function () {

  function ModuleConfig($urlRouterProvider) {

    $urlRouterProvider.otherwise(function ($injector) {
      // The URL failed to resolve. Let's give a try at traversal.
      var $state = $injector.get('$state');
      $state.go('siteroot.traverse');
    });

  }

  function ModuleRun($rootScope, $state, Traverser) {
    // Let's handle NotFound and Error

    // Not Found. Tried to go to a state that doesn't exist.
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
  }

  angular.module("moonshot")
    .config(ModuleConfig)
//    .run(ModuleRun)
  ;

})();