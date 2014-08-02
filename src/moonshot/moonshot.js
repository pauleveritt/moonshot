(function () {

  /* istanbul ignore next */
  function MoonshotInit(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9000/api');
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();
