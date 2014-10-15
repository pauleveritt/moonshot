(function () {

  function Users($http) {
    return {
      getUsers: function () {
        return $http.get('/api/users');
      }
    };
  }

  angular.module("moonshot")
    .factory('Users', Users);

})();