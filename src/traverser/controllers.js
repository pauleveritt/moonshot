(function () {

    function TraverserCtrl($log, $location, resolvedPath, $state) {
      var path = $location.path();
      $log.debug('TraverserCtrl', resolvedPath);

      if (path != '/bogus') {
        // This should be a not found
        $state.go('notfound');
      }
  }

  angular.module("moonshot")
    .controller("TraverserCtrl", TraverserCtrl);

})();