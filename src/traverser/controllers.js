(function () {

  function TraverserCtrl($state, resolvedPath, Traverser) {

    // First hande the case where resolvedPath says it couldn't
    // find anything.

    if (resolvedPath.error) {
      // This should be a not found
      $state.go('notfound');
    }

    var data = resolvedPath.data.data;
    Traverser.context = data.context;
    Traverser.viewName = data.viewName;
    Traverser.parents = data.parents;

    // Get the next state. Look in all the registered states at
    // view_config information.
    var nextState = Traverser.resolveState(
      Traverser.context, Traverser.viewName, Traverser.parents);

    if (nextState) {
      $state.go(nextState);
    } else {
      // Traverser failed to find a matching view
      $state.go('notfound');
    }

  }

  angular.module("moonshot")
    .controller("TraverserCtrl", TraverserCtrl);

})();