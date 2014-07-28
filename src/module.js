/*

Declare the application module with dependencies, and nothing more.

 */

var moonshotModules = [
  "ngAnimate", "ui.router", "restangular"
];

//if (document.URL.indexOf(":9000") != -1) {
//  moonshotModules.push('ngMockE2E');
//}
angular.module("moonshot", moonshotModules);
