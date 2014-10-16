describe("Moonshot Controllers", function () {

  var headerCtrl;
  beforeEach(module('moonshot'));

  beforeEach(inject(function ($controller) {
    headerCtrl = $controller("HeaderCtrl");
  }));

  describe("The Basics", function () {
    it("should be true", function () {
      var state = headerCtrl.$state;
      expect(state.current.name).toBe('');
    })

  });

});