(function () {

  function Profile($http) {
    return {
      getProfile: function () {
        return $http.get('/api/me');
      },
      updateProfile: function (profileData) {
        return $http.put('/api/me', profileData);
      },
      getUsers: function () {
        return $http.get('/api/users');
      }
    };
  }

  angular.module("moonshot")
    .factory('Profile', Profile);

})();