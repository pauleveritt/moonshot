(function () {

  function HeaderCtrl($state) {
    this.$state = $state;
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
             }
           })
      .sortBy("priority")
      .value();
  }

  function NotFoundCtrl($stateParams) {
    this.unfoundStateTo = $stateParams.unfoundStateTo;
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