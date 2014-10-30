(function () {

  function TraverserCtrl($state, resolvedPath, Traverser) {

    /*

    resolvedPath will return a dictionary such as:

    {
      error: 'Some Error Condition'
      schema: 'Some Schema Identifier'
      data: {
          viewName: the name of the view,
          context: the context object,
          parents: the parents array,
          view: the dict returned by any custom view
          items: sequence of children if it is a folder
          ordering: if ordered folder, the ordering of the item ids
        }

    }

     */

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
    var matchingView = Traverser.resolveState(
      Traverser.context, Traverser.viewName, Traverser.parents);
    var nextState = matchingView.stateName;

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