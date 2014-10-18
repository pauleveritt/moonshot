(function () {

  function TraverserCtrl($state, resolvedPath) {

    // First hande the case where resolvedPath says it couldn't
    // find anything.

    if (resolvedPath.error) {
      // This should be a not found
      $state.go('notfound');
    }

    var
      context = resolvedPath.context,
      viewName = resolvedPath.viewName,
      parents = resolvedPath.parents;
    console.debug('TraverserCtrl', context, viewName, parents);

  }

  angular.module("moonshot")
    .controller("TraverserCtrl", TraverserCtrl);

})();