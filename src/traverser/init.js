(function () {

  function ModuleConfig($urlRouterProvider) {

    $urlRouterProvider.otherwise(function ($injector) {
      // The URL failed to resolve. Let's give a try at traversal.
      var $state = $injector.get('$state');
      $state.go('siteroot.traverse');
    });

  }

  function ModuleRun($rootScope, $state, Traverser) {

    // Grab all the registered view_config info from the states. Make
    // a dict with a key of the view name, value all the view_config
    // info.
    Traverser.makeViewMap($state.get());

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
        console.debug('$stateChangeError', error);

        event.preventDefault();
        $state.go("error", {toState: toState.name, error: error});

      });
  }

  angular.module("moonshot")
    .config(ModuleConfig)
    .run(ModuleRun);

})();