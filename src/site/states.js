(function () {

  function ModuleInit($stateProvider) {

    var subsections = [
      {label: 'Home', state: 'siteroot.site'},
      {label: 'Form', state: 'siteroot.site.form'}
    ];

    $stateProvider
      .state("siteroot.site", {
               url: "/",
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
      .state("siteroot.site.form", {
               url: "form",
               views: {
                 "content@siteroot": {
                   templateUrl: "/site/form.partial.html",
                   controller: "SiteFormCtrl as SiteFormCtrl"
                 }
               }
             });
  }

  angular.module("moonshot")
    .config(ModuleInit);

})();

