(function () {

  function MoonshotInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'team-home'}
    ];

    $stateProvider
      .state("team-home", {
               url: "/team",
               parent: "siteroot",
               section: {
                 title: "Teams",
                 priority: 1
               },
               subsections: subsections,
               views: {
                 "content": {
                   templateUrl: "team/team-home.partial.html"
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();

