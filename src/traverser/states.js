(function () {

  function ModuleInit($stateProvider) {

    $stateProvider
      .state("siteroot.traverse", {
               views: {
                 "content@siteroot": {
                   template: "",
                   controller: "TraverserCtrl as TraverserCtrl",
                   resolve: {
                     resolvedPath: function (Traverser, $location) {
                       var path = $location.path();
                       return Traverser.resolvePath(path);
                     }
                   }
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(ModuleInit);

})();

