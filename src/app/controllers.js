(function () {

  function HeaderCtrl($state) {
    this.$state = $state;
  }

  function ContentCtrl() {
  }

  angular.module("moonshot")

    .controller("HeaderCtrl", HeaderCtrl)
    .controller("ContentCtrl", ContentCtrl)
})();