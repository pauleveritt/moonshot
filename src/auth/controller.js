(function () {


  function LoginCtrl($auth, $alert) {
    this.authenticate = function (provider) {
      $auth.authenticate(provider)
        .then(function () {
                $alert({
                         content: 'You have successfully logged in',
                         animation: 'fadeZoomFadeDown',
                         type: 'material',
                         duration: 3
                       });
              })
        .catch(function (response) {
                 $alert({
                          content: response.data,
                          animation: 'fadeZoomFadeDown',
                          type: 'material',
                          duration: 3
                        });
               });
    };
  }

  function LogoutCtrl($auth, $state, $alert) {
    $auth.logout()
      .then(function () {
              $alert({
                       content: 'You have been logged out',
                       animation: 'fadeZoomFadeDown',
                       type: 'material',
                       duration: 3
                     });
              $state.go('siteroot.site');
            });
  }

  function ProfileCtrl($http, $log) {
    var _this = this;
    this.user = {};

    $http.get('/api/me')
      .success(function (response) {
                 $log.debug('server profile data:', response);
                 _this.user = response.user;
               });
  }

  angular.module("moonshot")
    .controller("LoginCtrl", LoginCtrl)
    .controller("LogoutCtrl", LogoutCtrl)
    .controller('ProfileCtrl', ProfileCtrl);

})();