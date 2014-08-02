(function () {

  function MoonshotInit($stateProvider) {

    $stateProvider
      // The first top-level "page" that gets jammed into the content
      // view above
      .state("home", {
               url: "/",
               parent: "siteroot",
               section: {
                 title: "Home",
                 priority: 1
               },
               templateUrl: "site/home.partial.html"
             });
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();

