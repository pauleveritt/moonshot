(function () {

  function LoginCtrl($auth) {
    this.authenticate = function (provider) {
      $auth.authenticate(provider);
    };
  }

  function ProfileCtrl($http, $log, $auth) {
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
    .controller('ProfileCtrl', ProfileCtrl);

})();