(function () {

  function MoonshotInit($stateProvider, $urlRouterProvider, RestangularProvider) {

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
      .state('siteroot.login', {
               url: '/login',
               views: {
                 'content': {
                   templateUrl: '/app/login.partial.html',
                   controller: 'LoginCtrl as LoginCtrl'
                 }
               }
             })
      .state('siteroot.profile', {
               url: '/profile',
               views: {
                 'content': {
                   templateUrl: '/app/profile.partial.html',
                   controller: 'ProfileCtrl as ProfileCtrl'
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
    .config(MoonshotInit);
})();