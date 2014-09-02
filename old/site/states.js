(function () {

  function SiteRootCtrl($log) {
    $log.debug("SiteRootCtrl494");
  }

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
               templateUrl: "site/home.partial.html",
               controller: "SiteRootCtrl as SiteRootCtrl"
             });
  }

  angular.module("moonshot")
    .config(MoonshotInit)
    .controller("SiteRootCtrl", SiteRootCtrl);

})();

