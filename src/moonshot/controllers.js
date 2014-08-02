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

  angular.module("moonshot")

    .controller("HeaderCtrl", HeaderCtrl);

})();