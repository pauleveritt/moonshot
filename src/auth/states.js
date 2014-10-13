(function () {

  function ModuleInit($stateProvider) {

    $stateProvider
      .state('siteroot.login', {
               url: '/login',
               views: {
                 'content': {
                   templateUrl: '/auth/login.partial.html',
                   controller: 'LoginCtrl as LoginCtrl'
                 }
               }
             })
      .state('siteroot.profile', {
               url: '/profile',
               views: {
                 'content': {
                   templateUrl: '/auth/profile.partial.html',
                   controller: 'ProfileCtrl as ProfileCtrl'
                 }
               }
             });

  }

  angular.module("moonshot")
    .config(ModuleInit);
})();