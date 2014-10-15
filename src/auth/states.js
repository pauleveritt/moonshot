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
      .state('siteroot.logout', {
               url: '/logout',
               views: {
                 'content': {
                   controller: 'LogoutCtrl as LogoutCtrl'
                 }
               }
             })
      .state('siteroot.profile', {
               url: '/profile',
               authenticate: true,
               views: {
                 'content': {
                   templateUrl: '/auth/profile.partial.html',
                   controller: 'ProfileCtrl as ProfileCtrl'
                 }
               },
               resolve: {
                 profile: function (Profile, $alert) {
                   return Profile.getProfile()
                     .error(function (error) {
                              $alert({
                                       content: error.message,
                                       animation: 'fadeZoomFadeDown',
                                       type: 'material',
                                       duration: 3
                                     });
                            });
                 }
               }
             });

  }

  angular.module("moonshot")
    .config(ModuleInit);
})();