(function () {

  function UsersHomeCtrl(users) {
    this.users = users;
  }

  function UserLoginCtrl($auth) {
    var _this = this;

    this.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
  }

  angular.module('moonshot')
    .controller('UserLoginCtrl', UserLoginCtrl)
    .controller('UsersHomeCtrl', UsersHomeCtrl);
})();