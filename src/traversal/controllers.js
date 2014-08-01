(function () {

  function NotFoundCtrl($stateParams) {
    this.unfoundStateTo = $stateParams.unfoundStateTo;
  }

  function ErrorCtrl($stateParams) {
    this.toState = $stateParams.toState;
    this.error = $stateParams.error;
  }

  angular.module("moonshot")

    .controller("NotFoundCtrl", NotFoundCtrl)
    .controller("ErrorCtrl", ErrorCtrl)
})();