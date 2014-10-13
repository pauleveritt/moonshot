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