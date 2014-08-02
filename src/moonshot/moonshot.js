(function () {

  /* istanbul ignore next */
  function MoonshotConfig(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9000/api');
  }

  function MoonshotMocks() {
    this.mocks = {};

    this.$get = function () {
      var mocks = this.mocks;
      return {
        getMocks: function () {
          return mocks;
        }
      }
    };

    this.addMock = function (k, v) {
      this.mocks[k] = v;
    };
  }

  angular.module("moonshot")
    .provider('moonMockRest', MoonshotMocks)
    .config(MoonshotConfig);

})();
