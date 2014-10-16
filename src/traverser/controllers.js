(function () {

    function TraverserCtrl($log, $location, resolvedPath) {
      var path = $location.path();
      $log.debug('TraverserCtrl', resolvedPath);

      if (path != '/bogusx') {
        // This should be a not found
        $state.go('notfound')
      }
  }

  angular.module("moonshot")
    .controller("TraverserCtrl", TraverserCtrl);

})();