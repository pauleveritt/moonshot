(function () {

  function MoonshotInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'folder-home'}
    ];

    $stateProvider
      .state("folder-home", {
               url: "/folder",
               parent: "siteroot",
               section: {
                 title: "Folders",
                 priority: 2
               },
               subsections: subsections,
               views: {
                 "content": {
                   templateUrl: "/folder/folder-home.partial.html"
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();

