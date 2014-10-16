(function () {

  function ModuleInit($stateProvider) {

    $stateProvider
      .state("siteroot.traverse", {
               views: {
                 "content@siteroot": {
                   template: "",
                   controller: "TraverserCtrl as TraverserCtrl",
                   resolve: {
                     x: function () {
                       return 192;
                     }
                   }
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(ModuleInit);

})();

