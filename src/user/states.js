(function () {

  function ModuleInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'users'}
    ];

    $stateProvider
      .state('users', {
               url: '/users/',
               parent: 'siteroot',
               authenticate: true,
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
                 users: function (Users, $alert) {
                   return Users.getUsers()
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

  angular.module('moonshot')
    .config(ModuleInit);

})();

