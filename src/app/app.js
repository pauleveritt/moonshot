(function () {

  function HeaderCtrl($state) {
    this.$state = $state;
  }

  function ContentCtrl() {
  }

  /* istanbul ignore next */
  function AppConfig(RestangularProvider, $stateProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9000/api');
    $stateProvider
      // Provides the o-wrap and logic/state shared on everything in
      // this site
      .state("siteroot", {
               abstract: true,
               url: "",
               views: {
                 "header": {
                   templateUrl: "app/header.partial.html",
                   controller: HeaderCtrl,
                   controllerAs: "HeaderCtrl"
                 },
                 "content": {
                   templateUrl: "app/content.partial.html",
                   controller: ContentCtrl,
                   controllerAs: "ContentCtrl"
                 }
               }
             })
      // The first top-level "page" that gets jammed into the content
      // view above
      .state("home", {
               url: "/",
               parent: "siteroot",
               templateUrl: "app/home.partial.html"
             })

      // "Busted" state to demonstrate error handling when the
      // state-logic throws an exception.
      .state("busted", {
               url: "/busted",
               parent: "siteroot",
               templateUrl: "app/home.partial.html",
               resolve: {
                 busted: function () {
                   return x + y + x;
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(AppConfig)
    .controller("HeaderCtrl", HeaderCtrl)
    .controller("ContentCtrl", ContentCtrl);

})();
