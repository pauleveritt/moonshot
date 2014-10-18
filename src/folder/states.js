(function () {

  function ModuleInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'folder-home'}
    ];

    $stateProvider

      // Folder views driven by routes
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
             })

      // Now some folder views driven by traversal
      .state("rootfolder-default", {
               parent: "siteroot",
               viewConfig: {
                 name: 'default',
                 resourceType: 'RootFolder'
               },
               views: {
                 "content": {
                   templateUrl: "/folder/rootfolder-default.partial.html",
                   controller: "RootFolderDefaultCtrl as rfdctrl"
                 }
               }
             })

      .state("folder-default", {
               parent: "siteroot",
               viewConfig: {
                 name: 'default',
                 resourceType: 'Folder'
               },
               views: {
                 "content": {
                   templateUrl: "/folder/folder-default.partial.html",
                   controller: "FolderDefaultCtrl as fdctrl"
                 }
               }
             });

  }

  angular.module("moonshot")
    .config(ModuleInit);

})();

