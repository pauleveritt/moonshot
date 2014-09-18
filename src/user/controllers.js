(function () {

  function UsersHomeCtrl(users) {
    this.users = users;
  }

  angular.module('moonshot')
    .controller('UsersHomeCtrl', UsersHomeCtrl);
})();