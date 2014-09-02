/*

 Declare the module with dependencies, and nothing more.

 */

var appModules = [
  'ngAnimate', 'ngMessages', 'ui.router', 'restangular', 'satellizer'
];

if (document.URL.indexOf(':9000') != -1) {
  appModules.push('ngMockE2E');
  appModules.push('moonshotMock');
}
angular.module('moonshot', appModules)
  .value('mockRest', {});
