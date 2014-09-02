(function () {

  function MoonshotInit($stateProvider) {

    $stateProvider
      .state("directory", {
               url: "/directory",
               parent: "siteroot",
               section: {
                 title: "Directory",
                 priority: 2
               },
               template: "<h4>Directory Baby</h4>"
             })
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();

