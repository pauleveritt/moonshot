(function () {

  function MoonshotInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'users-home'},
      {label: 'Login', state: 'user-login'}
    ];

    $stateProvider
      .state('users-home', {
               url: '/users',
               parent: 'siteroot',
               section: {
                 title: 'Users',
                 priority: 1
               },
               subsections: subsections,
               views: {
                 "content@siteroot": {
                   templateUrl: '/user/users-home.partial.html',
                   controller: 'UsersHomeCtrl as UsersHomeCtrl'
                 }
               },
               resolve: {
                 users: function (Restangular) {
                   return Restangular.all('users').getList();
                 }
               }
             })
      .state('user-login', {
               url: '/login',
               parent: 'siteroot',
               subsections: subsections,
               views: {
                 content: {
                   templateUrl: '/user/user-login.partial.html',
                   controller: 'UserLoginCtrl as UserLoginCtrl'
                 }
               }
             });
  }

  angular.module('moonshot')
    .config(MoonshotInit);

})();

