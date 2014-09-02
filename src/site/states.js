(function () {

  function MoonshotInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'site'},
      {label: 'Form', state: 'site.form'}
    ];

    $stateProvider
      .state("site", {
               url: "/",
               parent: "siteroot",
               section: {
                 title: "Home",
                 priority: 1
               },
               subsections: subsections,
               views: {
                 "content": {
                   templateUrl: "/site/home.partial.html"
                 }
               }
             })
      .state("site.form", {
               url: "/form",
               subsections: subsections,
               views: {
                 "content": {
                   templateUrl: "/site/form.partial.html",
                   controller: "SiteFormCtrl as SiteFormCtrl"
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();

