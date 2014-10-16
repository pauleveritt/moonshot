(function () {

  function ModuleInit($stateProvider, $urlRouterProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://127.0.0.1:3000/api');

    $stateProvider
      .state('siteroot', {
               abstract: true,
               url: "",
               views: {
                 "header": {
                   templateUrl: '/app/header.partial.html',
                   controller: "HeaderCtrl as HeaderCtrl"
                 },
                 "content": {
                   template: '<div ui-view="content"></div>'
                 }
               }
             })

      // NotFound, Error, and Forbidden views
      .state("notfound", {
               parent: "siteroot",
               views: {
                 "content": {
                   templateUrl: "/app/notfound.partial.html",
                   controller: "NotFoundCtrl as NotFoundCtrl"

                 }
               },
               params: ["unfoundStateTo"]
             })
      .state("error", {
               parent: "siteroot",
               views: {
                 "content": {
                   templateUrl: "/app/error.partial.html",
                   controller: "ErrorCtrl as ErrorCtrl"
                 }
               },
               params: ["toState", "error"]
             })

      // "Busted" state to demonstrate error handling when the
      // state-logic throws an exception.
      .state("busted", {
               url: "/busted",
               parent: "siteroot",
               templateUrl: "/app/home.partial.html",
               resolve: {
                 busted: function () {
                   return x + y + x;
                 }
               }
             });

    $urlRouterProvider.rule(function ($injector, $location) {

      // Handle the case of going to index.html without #/
      if ($location.url() === "") {
        return "/";
      }

    });

  }

  angular.module("moonshot")
    .config(ModuleInit);
})();