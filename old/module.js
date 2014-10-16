/*

 Declare the moonshot module with dependencies, and nothing more.

 */

var moonshotModules = [
  "ngAnimate", "ngMessages", "ui.router", "restangular"
];

if (document.URL.indexOf(":9000") != -1) {
  moonshotModules.push('ngMockE2E');
  moonshotModules.push('moonshotDev');
}
angular.module("moonshot", moonshotModules)
  .value("mockRest", {});
