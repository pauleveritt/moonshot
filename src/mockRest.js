/*

 When running in dev mode, mock calls to the REST API
 but pass everything else through.

 */

(function (ng, mod, _, undefined) {
  'use strict';

  mod.run(function ($httpBackend) {

    // returns an object that contains faked data
    var todos = [
      {
        "id": "i1",
        "title": "Milk"
      },
      {
        "id": "i2",
        "title": "Eggs"
      },
      {
        "id": "i3",
        "title": "Bread"
      },
      {
        "id": "i4",
        "title": "Cheese"
      },
      {
        "id": "i5",
        "title": "Ham"
      }
    ];

    $httpBackend.whenGET(/api\/todos$/)
      .respond(function () {
                 return [200, todos];
               });

    // pass through everything else
    $httpBackend.whenGET(/\/*/).passThrough();
    $httpBackend.whenPOST(/\/*/).passThrough();
    $httpBackend.whenPUT(/\/*/).passThrough();

  })
}(angular, angular.module('moonshotDev', ['moonshot', 'ngMockE2E']), _));