describe("Moonshot Controllers", function () {

  var ctrl, $rootScope, $scope, mockResolvedPath;
  beforeEach(module('moonshot'));

  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;
  }));

  beforeEach(inject(function ($controller) {
    $scope = $rootScope.$new();

    mockResolvedPath = {
      context: {_id: 1}
    };

//    spyOn(mockResolvedPath, 'context').andCallThrough();

    ctrl = $controller('TraverserCtrl', {
      '$scope': $scope,
      'resolvedPath': mockResolvedPath
    });
  }));


  describe("The Basics", function () {

    it("should be true", function () {
      expect(ctrl.context).toBe(939);
    });
//      var state = ctrl.$state;
//      expect(state.current.name).toBe('');
//    })

  });

});