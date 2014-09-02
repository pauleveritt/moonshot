/*

 When running in dev mode, mock calls to the REST API
 but pass everything else through.

 */

(function (ng, mod, _, undefined) {
  'use strict';

  mod.run(function ($httpBackend, moonMockRest) {

    var mocks = moonMockRest.getMocks();

    // Iterate over all the registered mocks and register them
    _.map(mocks, function (moduleMocks) {
      // All the mocks registered for this module
      _(moduleMocks).forEach(function (mock) {
        var match = mock[0],
          responder = mock[1];
        $httpBackend.whenGET(match)
          .respond(responder);
      });
    });

    // pass through everything else
    $httpBackend.whenGET(/\/*/).passThrough();
    $httpBackend.whenPOST(/\/*/).passThrough();
    $httpBackend.whenPUT(/\/*/).passThrough();

  })
}(angular, angular.module('moonshotDev', ['moonshot', 'ngMockE2E']), _));