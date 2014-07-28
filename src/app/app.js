(function () {

  function RootCtrl($scope) {
    $scope.site = {title: "Moonshot"};
  }

  function AppConfig(RestangularProvider, $stateProvider) {
    RestangularProvider.setBaseUrl('http://localhost:9000/api');
    $stateProvider
      .state("root", {
               abstract: true,
               url: "",
               views: {
                 "header": {
                   templateUrl: "header.html"
                 },
                 "content": {
                   templateUrl: "app/root.partial.html",
                   controller: "RootCtrl",
                   controllerAs: "RootCtrl"
                 }
               }
             })
      .state("home", {
               url: "/",
               parent: "root",
               templateUrl: "app/home.partial.html"
             });

  }

  angular.module("moonshot")
    .config(AppConfig)

    .controller("RootCtrl", RootCtrl);

})();
