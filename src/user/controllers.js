(function () {

  function UsersHomeCtrl() {
//    this.users = users;
  }

  function UserLoginCtrl($auth, $window) {
    var _this = this;

    var token = 'satellizer_token';

    this.current_user = $window.localStorage[token];

    this.authenticate = function (provider) {
      $auth.authenticate(provider);
    };
  }

  angular.module('moonshot')
    .controller('UserLoginCtrl', UserLoginCtrl)
    .controller('UsersHomeCtrl', UsersHomeCtrl);
})();