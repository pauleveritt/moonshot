(function () {

  function MoonshotInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'users'},
      {label: 'Login', state: 'users.login'}
    ];

    $stateProvider
      .state('users', {
               url: '/users/',
               parent: 'siteroot',
               section: {
                 title: 'Users',
                 priority: 1
               },
               subsections: subsections,
               views: {
                 "content": {
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
      .state('users.login', {
               url: 'login',
               subsections: subsections,
               views: {
                 "content@siteroot": {
                   templateUrl: '/user/users-login.partial.html',
                   controller: 'UserLoginCtrl as UserLoginCtrl'
                 }
               }
             });
  }

  angular.module('moonshot')
    .config(MoonshotInit);

})();

