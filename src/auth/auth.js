(function () {

  function AuthzResponseRedirect($q, $injector) {

    return {
      responseError: function (rejection) {
        var
          $state = $injector.get('$state'),
          $alert = $injector.get('$alert');

        // We can get an /api/ response of forbidden for
        // some data needed in a view. Flash an alert saying that this
        // data was requested.
        var url = rejection.config.url;
        if (rejection.status == 403 || rejection.status == 401) {
          // Redirect to the login form
          $state.go('siteroot.login');
          var msg = 'Login required for: ' + url;
          $alert({
                   content: msg,
                   animation: 'fadeZoomFadeDown',
                   type: 'material',
                   duration: 3
                 });
        }
        return $q.reject(rejection);
      }
    };

  }

  function AuthzStateRedirect($rootScope, $state, $auth) {
    // A state can be annotated with a value indicating
    // the state requires login.

    $rootScope.$on("$stateChangeStart", function (event, toState) {
      if (toState.authenticate && !$auth.isAuthenticated()) {
        // User isn’t authenticated
        $state.transitionTo("siteroot.login");
        event.preventDefault();
      }
    });
  }

  function ModuleInit($httpProvider, $authProvider) {

    $httpProvider.interceptors.push('authzRedirect');

    // Satellizer setup
    $authProvider.loginUrl = '/api/auth/login';
    $authProvider.signupUrl = '/api/auth/signup';
    $authProvider.twitter({
                            url: 'http://127.0.0.1:3000/api/auth/twitter'
                          });
  }

  angular.module("moonshot")
    .factory('authzRedirect', AuthzResponseRedirect)
    .config(ModuleInit)
    .run(AuthzStateRedirect);

})
();
