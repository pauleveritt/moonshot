(function () {

  function AppConfig($stateProvider) {

    $stateProvider
      .state("directory", {
               url: "/directory",
               parent: "siteroot",
               template: "<h4>Directory Baby</h4>"
             })
  }

  angular.module("moonshot")
    .config(AppConfig);

})();

