(function () {

  function ModuleInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'users'}
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
                 content: {
                   templateUrl: '/user/users-home.partial.html',
                   controller: 'UsersHomeCtrl as UsersHomeCtrl'
                 }
               },
               resolve: {
                 users: function (Restangular) {
                   return Restangular.all('users').getList();
                 }
               }
             });
  }

  angular.module('moonshot')
    .config(ModuleInit);

})();

