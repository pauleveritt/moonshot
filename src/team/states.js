(function () {

  function MoonshotInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'teams'}
    ];

    $stateProvider
      .state('teams', {
               url: '/teams/',
               parent: 'siteroot',
               section: {
                 title: 'Teams',
                 priority: 1
               },
               subsections: subsections,
               views: {
                 'content': {
                   templateUrl: '/team/team-home.partial.html'
                 }
               }
             });
  }

  angular.module('moonshot')
    .config(MoonshotInit);

})();

