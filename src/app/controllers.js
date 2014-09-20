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

  function HeaderCtrl($rootScope, $state, $auth) {
    var ctrl = this;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$auth = $auth;

    this.logout = function () {
      $auth.logout()
        .then(function () {
                $state.go('siteroot.login');
              });
    };

    this.sections = _($state.get())
      .filter(function (state) {
                return _.has(state, "section");
              })
      .map(function (state) {
             var s = state.section;
             return {
               title: s.title,
               priority: s.priority ? s.priority : 99,
               state: state.name
             };
           })
      .sortBy("priority")
      .value();

    // When the state changes, update the subsections
    this.subsections = this.$state.current.subsections;
    $rootScope.$on('$stateChangeSuccess', ctrl.updateSubsections);
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      $rootScope.$evalAsync(function () {
        // Wrap in $evalAsync as we are re-assigning a list
        ctrl.subsections = toState.subsections;
      });
    });
  }

  angular.module("moonshot")
    .controller("HeaderCtrl", HeaderCtrl)
    .controller("LoginCtrl", LoginCtrl)
    .controller('ProfileCtrl', ProfileCtrl);

})();