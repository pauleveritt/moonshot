(function () {

  function HeaderCtrl($state) {
    this.$state = $state;
  }

  function ContentCtrl() {
  }

  function AppConfig(RestangularProvider, $stateProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9000/api');
    $stateProvider
      // Provides the o-wrap and logic/state shared on everything in
      // this site
      .state("root", {
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
               parent: "root",
               templateUrl: "app/home.partial.html"
             });

  }

  angular.module("moonshot")
    .config(AppConfig)

})();
