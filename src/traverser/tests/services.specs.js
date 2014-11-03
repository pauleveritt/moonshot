describe("Traverser Service", function () {

  var Traverser;

  beforeEach(module('traverser'));

  beforeEach(inject(function (_Traverser_) {
    Traverser = _Traverser_;
  }));

  describe("Making a view map", function () {

    it("should NOT make a viewMap", function () {
      var states = [
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      expect(_.isEmpty(Traverser.viewMap)).toBe(true);
    });

    it("should NOT make a viewMap (check disableTraversal true)", function () {
      var states = [
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      expect(Traverser.disableTraversal).toBe(true);
    });

    it("should make a viewMap (check disableTraversal false)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      expect(Traverser.disableTraversal).toBe(false);
    });

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

    it("should make a viewMap (special case - no resourceType)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview1',
          viewConfig: {name: 'default'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[1];
      expect(viewConfig.resourceType).toBe(undefined);
    });

    it("should make a viewMap (special case - no resourceType + marker)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview1',
          viewConfig: {name: 'default'}},
        {name: 'folderview2',
          viewConfig: {name: 'default', marker: 'marker1'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      expect(Traverser.viewMap.default[0].marker).toBe('marker1');
      expect(Traverser.viewMap.default[1].resourceType).toBe('folder');
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
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.containment).toBe('rootfolder');
    });

    it("should make a viewMap (best match ordering with containment AND marker - simple case)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'folderview-containment-marker',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder', marker: 'somemarker'}},
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
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'folderview-marker',
          viewConfig: {resourceType: 'folder', name: 'default', marker: 'somemarker'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.marker).toBe('somemarker');
    });

    it("should make a viewMap (bug 1)", function () {
      // the very first version of viewMap algorithm suffers a problem
      var states = [
        {name: 'folderview-1',
          viewConfig: {resourceType: 'f1', name: 'default'}},
        {name: 'folderview-2',
          viewConfig: {resourceType: 'f2', name: 'default'}},
        {name: 'folderview-3',
          viewConfig: {resourceType: 'f1', name: 'default', containment: 'c1'}},
        {name: 'folderview-4',
          viewConfig: {resourceType: 'f3', name: 'default'}},
        {name: 'folderview-5',
          viewConfig: {resourceType: 'f3', name: 'default', containment: 'c1'}}
      ];
      // we should get f3c1, f3, f2, f1c1, f1 instead of f3, f2, f1c1, f3c1, f1
      Traverser.makeViewMap(states);
      var viewConfigDefault = Traverser.viewMap.default;
      var config1Index = _.findIndex(viewConfigDefault, {stateName: 'folderview-1'});
      var config2Index = _.findIndex(viewConfigDefault, {stateName: 'folderview-2'});
      var config3Index = _.findIndex(viewConfigDefault, {stateName: 'folderview-3'});
      var config4Index = _.findIndex(viewConfigDefault, {stateName: 'folderview-4'});
      var config5Index = _.findIndex(viewConfigDefault, {stateName: 'folderview-5'});

      // viewConfigs should exists
      expect(config1Index >= 0).toBe(true);
      expect(config2Index >= 0).toBe(true);
      expect(config3Index >= 0).toBe(true);
      expect(config4Index >= 0).toBe(true);
      expect(config5Index >= 0).toBe(true);

      // order precedence
      expect(config3Index < config1Index).toBe(true);
      expect(config5Index < config4Index).toBe(true);
    });

    it("should make a viewMap (bug 2)", function () {
      // the very first version of viewMap algorithm suffers a problem
      var states = [
        {name: 'folderview-1',
          viewConfig: {resourceType: 'f1', name: 'default'}},
        {name: 'folderview-2',
          viewConfig: {resourceType: 'f1', name: 'default', marker: 'm1', containment: 'c1'}},
        {name: 'folderview-3',
          viewConfig: {resourceType: 'f1', name: 'default', containment: 'c1'}},
      ];
      // we should get f1m1c1, f1c1, f1 instead of f1c1, f1m1c1, f1
      Traverser.makeViewMap(states);
      var viewConfig = Traverser.viewMap.default[0];
      expect(viewConfig.stateName).toBe('folderview-2');
    });
  });

  describe("Resolve states", function () {

    var toState;

    it("no available state (missing view)", function () {
      var states = [
        {name: 'state1', viewConfig: {name: 'default'}}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1'};
      toState = Traverser.resolveState(context, 'aview');
      expect(toState).toBe(undefined);
    });

    it("should choose the highest precedence (just one state)", function () {
      var states = [
        {name: 'state1', viewConfig: {name: 'default'}}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1'};
      toState = Traverser.resolveState(context, 'default');
      expect(toState).toBe('state1');
    });

    it("should choose the highest precedence (no marker interface)", function () {
      var states = [
        {name: 'state1', viewConfig: {name: 'default'}},
        {name: 'state2', viewConfig: {name: 'default', marker: 'somemarker'}}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1'};
      toState = Traverser.resolveState(context, 'default');
      expect(toState).toBe('state1');
    });

    it("should choose the highest precedence (with marker interface)", function () {
      var states = [
        {name: 'state1', viewConfig: {name: 'default'}},
        {name: 'state2', viewConfig: {name: 'default', marker: 'somemarker'}}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', markers: ['somemarker']};
      toState = Traverser.resolveState(context, 'default');
      expect(toState).toBe('state2');
    });

    it("should choose the highest precedence (special case - no resourceType match)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview1',
          viewConfig: {name: 'default'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'MyFolder'};
      toState = Traverser.resolveState(context, 'default');
      expect(toState).toBe('folderview1');
    });

    it("should choose the highest precedence (special case - resourceType match)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview1',
          viewConfig: {name: 'default'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'folder'};
      toState = Traverser.resolveState(context, 'default');
      expect(toState).toBe('folderview');
    });

    it("should choose the highest precedence (special case - resourceType match but marker has higher priority)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview1',
          viewConfig: {name: 'default'}},
        {name: 'folderview2',
          viewConfig: {name: 'default', marker: 'marker1'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'folder', markers: ['marker1']};
      toState = Traverser.resolveState(context, 'default');
      expect(toState).toBe('folderview2');
    });

    it("should choose the highest precedence (special case - containment)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'folder'};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'rootfolder'}]);
      expect(toState).toBe('folderview-containment');
    });

    it("should choose the highest precedence (special case - containment with ancestor)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'folder'};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'rootfolder'}, {resourceType: 'afolder'}]);
      expect(toState).toBe('folderview-containment');
    });

    it("should choose the highest precedence (special case - containment AND marker - simple case)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'folderview-containment-marker',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder', marker: 'somemarker'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'folder', markers: ['somemarker']};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'rootfolder'}]);
      expect(toState).toBe('folderview-containment-marker');
    });

    it("should choose the highest precedence (special case - containment AND no marker match - simple case)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'folderview-containment-marker',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder', marker: 'somemarker'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'folder', markers: ['othermarker']};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'rootfolder'}]);
      expect(toState).toBe('folderview-containment');
    });

    it("should choose the highest precedence (special case - marker match > containment match)", function () {
      var states = [
        {name: 'folderview',
          viewConfig: {resourceType: 'folder', name: 'default'}},
        {name: 'folderview-containment',
          viewConfig: {resourceType: 'folder', name: 'default', containment: 'rootfolder'}},
        {name: 'folderview-marker',
          viewConfig: {resourceType: 'folder', name: 'default', marker: 'somemarker'}},
        {name: 'some.route'}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'folder', markers: ['somemarker']};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'rootfolder'}]);
      expect(toState).toBe('folderview-marker');
    });

    it("should choose the highest precedence (bug 1 case)", function () {
      // the very first version of viewMap algorithm suffers a problem
      var states = [
        {name: 'folderview-1',
          viewConfig: {resourceType: 'f1', name: 'default'}},
        {name: 'folderview-2',
          viewConfig: {resourceType: 'f2', name: 'default'}},
        {name: 'folderview-3',
          viewConfig: {resourceType: 'f1', name: 'default', containment: 'c1'}},
        {name: 'folderview-4',
          viewConfig: {resourceType: 'f3', name: 'default'}},
        {name: 'folderview-5',
          viewConfig: {resourceType: 'f3', name: 'default', containment: 'c1'}}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'f3'};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'c1'}]);
      expect(toState).toBe('folderview-5');
    });

    it("should choose the highest precedence (bug 2 case - containment match)", function () {
      // the very first version of viewMap algorithm suffers a problem
      var states = [
        {name: 'folderview-1',
          viewConfig: {resourceType: 'f1', name: 'default'}},
        {name: 'folderview-2',
          viewConfig: {resourceType: 'f1', name: 'default', marker: 'm1', containment: 'c1'}},
        {name: 'folderview-3',
          viewConfig: {resourceType: 'f1', name: 'default', containment: 'c1'}},
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'f1'};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'c1'}]);
      expect(toState).toBe('folderview-3');
    });

    it("should choose the highest precedence (bug 2 case - marker and containment match)", function () {
      // the very first version of viewMap algorithm suffers a problem
      var states = [
        {name: 'folderview-1',
          viewConfig: {resourceType: 'f1', name: 'default'}},
        {name: 'folderview-2',
          viewConfig: {resourceType: 'f1', name: 'default', marker: 'm1', containment: 'c1'}},
        {name: 'folderview-3',
          viewConfig: {resourceType: 'f1', name: 'default', containment: 'c1'}},
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'f1', markers: ['marker1', 'm1']};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'c1'}]);
      expect(toState).toBe('folderview-2');
    });

  });

  describe("Resolve states (parentTypes markers)", function () {

    it("should choose the highest precedence (containment parent markers match)", function () {
      var states = [
        {name: 'folderview-1',
          viewConfig: {resourceType: 'f1', name: 'default'}},
        {name: 'folderview-2',
          viewConfig: {resourceType: 'f1', name: 'default', marker: 'm1', containment: 'c1'}},
        {name: 'folderview-3',
          viewConfig: {resourceType: 'f1', name: 'default', containment: 'c1'}}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'f1', markers: ['othermarker']};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'c1', markers: ['m1']}]);
      expect(toState).toBe('folderview-2');
    });
  });

  describe("Resolve states (pathInfo)", function () {

    iit("should choose the highest precedence (more specific path info)", function () {
      var states = [
        {name: 'folderview-1',
          viewConfig: {resourceType: 'f1', name: 'default'}},
        {name: 'folderview-2',
          viewConfig: {resourceType: 'f1', name: 'default', marker: 'm1', containment: 'c1'}},
        {name: 'folderview-3',
          viewConfig: {resourceType: 'f1', name: 'default', containment: 'c1'}},
        {name: 'folderview-4',
          viewConfig: {resourceType: 'f1', name: 'default', marker: 'm1', containment: 'c1', pathInfo: '/f'}}
      ];
      Traverser.makeViewMap(states);
      var context = {title: 'Context 1', resourceType: 'f1', path: '/f/f1', markers: ['othermarker']};
      toState = Traverser.resolveState(context, 'default', [{resourceType: 'c1', markers: ['m1']}]);
      expect(toState).toBe('folderview-4');
    });
  });

});

