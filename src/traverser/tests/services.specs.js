describe("Traverser Service", function () {

  var Traverser;

  beforeEach(module('traverser'));

  beforeEach(inject(function (_Traverser_) {
    Traverser = _Traverser_;
  }));

  describe("Making a view map", function () {

    it("should make a viewMap", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.resourceType).toBe('folder');
    });

    it("should make a viewMap (best match ordering)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-marker',
          viewConfig: {resourceType: 'folder', name: 'default', marker: 'somemarker'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.marker).toBe('somemarker');
    });

  });

  describe("Resolve states", function () {

    var toState;

    it("should choose the highest precedence", function () {
      var states = [
        {name: 'some-state', viewConfig: {name: 'default'}
        }
      ];
      Traverser.makeViewMap(states);
      var args = {title: 'Context 1', viewName: 'default'};
      toState = Traverser.resolveState(args);
      expect(toState).toBe('folder');
    });

    it("should choose the highest precedence", function () {
      var states = [
        {name: 'view1',
          viewConfig: {name: 'default',
            resourceType: 'folder'}
        }
      ];
      Traverser.makeViewMap(states);


      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.resourceType).toBe('folder');
    });

  });

});

