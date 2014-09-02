(function () {

  function UsersHomeCtrl(users) {
    this.users = users;
  }

  function UserLoginCtrl($window, $http, $auth) {
    var _this = this;

    this.authenticate = function(provider) {
      $auth.authenticate(provider);
    };


    this.submit = function (username, password) {
      $http.
        post('/api/authenticate',
             {username: username, password: password})
        .success(function (data, status, headers, config) {
                   $window.sessionStorage.token = data.token;
                   _this.message = 'Success';
                 })
        .error(function (data, status, headers, config) {
                 // Erase the token if the user fails to log in
                 delete $window.sessionStorage.token;

                 // Handle login errors here
                 _this.message = 'Error: Invalid user or password';
               });
    };
  }

  angular.module('moonshot')
    .controller('UserLoginCtrl', UserLoginCtrl)
    .controller('UsersHomeCtrl', UsersHomeCtrl);
})();