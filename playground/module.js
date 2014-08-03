(function () {

  function TraverserCtrl($log) {
    $log.debug("TraverserCtrl44");
  }

  function MoonshotCtrl($log) {
    $log.debug("MoonshotCtrl44");
  }

  function SiteRootCtrl($log) {
    $log.debug("SiteRootCtrl44");
  }

  function HomeCtrl($log) {
    $log.debug("homectrl44");
  }

  function AppConfig($stateProvider) {
    $stateProvider

      .state("traverser", {
               abstract: true,
               template: '<ui-view id="traverser"></ui-view>',
               controller: "TraverserCtrl as TraverserCtrl"
             })

      .state("moonshot", {
               abstract: true,
               parent: "traverser",
               templateUrl: "moonshot.partial.html",
               controller: "MoonshotCtrl as MoonshotCtrl"
             })

      .state("siteroot", {
               parent: "moonshot",
               url: "/",
               templateUrl: "siteroot.partial.html",
               controller: "SiteRootCtrl as SiteRootCtrl"
             })

      .state("home", {
               parent: "siteroot",
               url: "home",
               views: {
                 "": {
                   templateUrl: "home.partial.html",
                   controller: "HomeCtrl as HomeCtrl"
                 },
                 "header@moonshot": {
                   template: "<div>the header</div>"
                 }
               }
             });
  }

  angular.module("moonshot", ["ui.router"])
    .config(AppConfig)
    .controller("TraverserCtrl", TraverserCtrl)
    .controller("MoonshotCtrl", MoonshotCtrl)
    .controller("SiteRootCtrl", SiteRootCtrl)
    .controller("HomeCtrl", HomeCtrl);

})();
