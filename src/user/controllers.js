(function () {

  function UsersHomeCtrl(users) {
    this.users = users.data.data;
  }

  angular.module('moonshot')
    .controller('UsersHomeCtrl', UsersHomeCtrl);
})();