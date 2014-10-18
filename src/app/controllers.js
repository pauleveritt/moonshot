(function () {

  function HeaderCtrl($rootScope, $state, $auth) {
    var ctrl = this;
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$auth = $auth;

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


  function NotFoundCtrl($location) {
    this.path = $location.path();
  }

  function ErrorCtrl($stateParams) {
    this.toState = $stateParams.toState;
    this.error = $stateParams.error;
  }


  angular.module("moonshot")
    .controller("HeaderCtrl", HeaderCtrl)
    .controller("NotFoundCtrl", NotFoundCtrl)
    .controller("ErrorCtrl", ErrorCtrl);

})();