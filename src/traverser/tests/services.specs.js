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

    it("should make a viewMap (should update stateName)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.stateName).toBe('folderview');
    });

    it("should make a viewMap (standard angular routes should not be defined)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(Traverser.viewMap['some.route']).toBe(undefined);
    });

    it("should make a viewMap (best match ordering with marker)", function () {
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

    it("should make a viewMap (best match ordering with containment)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          // why containment and contains? Shouldn't be sufficient just contains
          viewConfig: {resourceType: 'folder', name: 'default', containment: true, contains: 'rootfolder'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.contains).toBe('rootfolder');
    });

    it("should make a viewMap (best match ordering with containment AND marker - simple case)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          // why containment and contains? Shouldn't be sufficient just contains
          viewConfig: {resourceType: 'folder', name: 'default', containment: true, contains: 'rootfolder'}},
        {name: 'folderview-containment-marker',
          viewConfig: {resourceType: 'folder', name: 'default', containment: true, contains: 'rootfolder', marker: 'somemarker'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.marker).toBe('somemarker');
    });

    it("should make a viewMap (best match ordering with containment AND marker - complex case)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          // why containment and contains? Shouldn't be sufficient just contains
          viewConfig: {resourceType: 'folder', name: 'default', containment: true, contains: 'rootfolder'}},
        {name: 'folderview-marker',
          viewConfig: {resourceType: 'folder', name: 'default', marker: 'somemarker'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.marker).toBe('somemarker');    // marker highest precedence?
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

