(function () {

    function TraverserCtrl($log, $location, x) {
      var path = $location.path();
      $log.debug('TraverserCtrl', x);

      if (path != '/bogusx') {
        // This should be a not found
        $state.go('notfound')
      }
  }

  angular.module("moonshot")
    .controller("TraverserCtrl", TraverserCtrl);

})();