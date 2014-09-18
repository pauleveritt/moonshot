(function () {

  function AuthzRedirect($q, $injector) {

    return {
      responseError: function (rejection) {
        var $state = $injector.get('$state');
        if (rejection.status == 403 || rejection.status == 401) {
          // Redirect to the login form
          $state.go('siteroot.login');
        }
        return $q.reject(rejection);
      }
    };

  }

  function ModuleInit($httpProvider, $authProvider, $injector) {

    $httpProvider.interceptors.push('authzRedirect');
    $authProvider.twitter({
                            url: 'http://127.0.0.1:3000/auth/twitter'
                          });
  }

  angular.module("moonshot")
    .factory('authzRedirect', AuthzRedirect)
    .config(ModuleInit);

})();
