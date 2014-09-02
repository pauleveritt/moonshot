(function () {

  function MoonshotInit($stateProvider, $urlRouterProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:9000/api');

    $stateProvider
      .state('siteroot', {
               abstract: true,
               url: "",
               views: {
                 "header": {
                   templateUrl: 'app/header.partial.html',
                   controller: "HeaderCtrl as HeaderCtrl"
                 },
                 "content": {
                   template: '<div ui-view="content"></div>'
                 }
               }
             });

    $urlRouterProvider.rule(function ($injector, $location) {

      // Handle the case of going to index.html without #/
      if ($location.url() === "") {
        return "/";
      }

    });

  }


  function MoonshotMocks() {
    this.mocks = {};

    this.$get = function () {
      var mocks = this.mocks;
      return {
        getMocks: function () {
          return mocks;
        }
      };
    };

    this.addMock = function (k, v) {
      this.mocks[k] = v;
    };
  }

  angular.module("moonshot")
    .provider('moonshotMockRest', MoonshotMocks)
    .config(MoonshotInit);


})();