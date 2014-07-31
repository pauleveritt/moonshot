describe("Moonshot Controllers", function () {

  var headerCtrl, contentCtrl;
  beforeEach(module('moonshot'));

  beforeEach(inject(function ($controller) {
    headerCtrl = $controller("HeaderCtrl");
    contentCtrl = $controller("ContentCtrl");
  }));

  describe("The Basics", function () {
    it("should be true", function () {
      var state = headerCtrl.$state;
      expect(state.current.name).toBe('');
    })

  });

});