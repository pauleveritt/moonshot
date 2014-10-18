(function () {

  function Traverser($http) {
    var _this = this;

    this.x = 1;
    this.userTraversal = true; // Let traversal be disabled at config

    // At startup, take the list of states and make a viewMap.
    this.viewMap = {};
    this.makeViewMap = function (states) {
      this.viewMap = {};
      _(states)
        .filter(function (state) {
                  return _.has(state, "viewConfig");
                })
        .forEach(function (state) {
                   console.debug('39939', state)
                   var vc = state.viewConfig;
                   var viewName = vc.viewName;
                   if (!_this.viewMap.viewName) {
                     _this.viewMap.viewName = [];
                   }
                   _this.viewMap.viewName.push(
                     {
                       name: vc.name,
                       resourceType: vc.resourceType,
                       stateName: state.name
                     }
                   );
                 })
    };

    this.resolvePath = function (path) {
      return $http.get('/api' + path);
    };

    this.resolveState = function (context, viewName) {
      // Based on request info, find the matching view in the view
      // map based on priority.

      var views = _this.viewMap[viewName];
//      var matchingView = _(views, func)

      var targetState = 'rootfolder-default';
      return targetState;
    };

    this.transitionTo = function (context, viewName, parents) {
      // If the state map isn't generated, then generate it
      var views = this.getViewMap();

      // Find all view declarations for this viewName

      // Based on priority settings,
    };
  }

  angular.module("moonshot")
    .service("Traverser", Traverser);

})();