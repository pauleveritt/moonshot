(function () {

  function ModuleInit($stateProvider) {

    $stateProvider
      .state("siteroot.traverse", {
               views: {
                 "content@siteroot": {
                   template: "",
                   controller: "TraverserCtrl as TraverserCtrl",
                   resolve: {
                     resolvedPath: function (Traverser, $location, $alert) {
                       var path = $location.path();
                       return Traverser.resolvePath(path)
                         .catch(function (response) {
                                  var msg = 'Traversal error: ' + response.data.message;
                                  $alert({
                                           content: msg,
                                           animation: 'fadeZoomFadeDown',
                                           type: 'material',
                                           duration: 3
                                         });
                                });
                     }
                   }
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(ModuleInit);

})();

