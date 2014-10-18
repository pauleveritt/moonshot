(function () {

  function TraverserCtrl($state, resolvedPath) {

    this.x = 939;

    // First hande the case where resolvedPath says it couldn't
    // find anything.

    if (resolvedPath.error) {
      // This should be a not found
      $state.go('notfound');
    }

    this.context = resolvedPath.context;
    this.viewName = resolvedPath.viewName;
    this.parents = resolvedPath.parents;

  }

  angular.module("moonshot")
    .controller("TraverserCtrl", TraverserCtrl);

})();