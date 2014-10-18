(function () {

  function Traverser($http) {
    var _this = this;

    this.x = 1;

    // At startup, take the list of states and make a viewMap. The
    // viewMap will look like:
    // default:
    //   [
    //      {resourceType: 'Folder', containment: something,
    //       stateName: 'folder-default'
    //      }
    //   ]
    // Meaning, it has the predicate information used in Pyramid
    // views. We key on viewName just to speed up the resolution.
    this.viewMap = {};
    this.makeViewMap = function (states) {
      this.viewMap = {};
      _(states)
        .filter(function (state) {
                  return _.has(state, "viewConfig");
                })
        .forEach(function (state) {
                   var vc = state.viewConfig;
                   if (vc) {
                     // This state has a viewConfig
                     var viewName = vc.name;

                     // If the viewMap doesn't yet have this
                     // viewName, add it with an empty seq
                     if (!_this.viewMap[viewName]) {
                       _this.viewMap[viewName] = [];
                     }
                     // Now push info from this state onto the viewMap
                     _this.viewMap[viewName].push(
                       {
                         name: vc.name,
                         resourceType: vc.resourceType,
                         stateName: state.name
                       }
                     );

                   }
                 });

      this.disableTraversal = _.isEmpty(this.viewMap);
    };

    this.resolvePath = function (path) {
      return $http.get('/api' + path);
    };

    this.resolveState = function (context, viewName) {
      // Based on request info, find the matching view in the view
      // map based on priority.

      var views = _this.viewMap[viewName];
      var matchingView = _.find(views, function (viewConfig) {
        // Most specific:
        var resourceType = context.resourceType;
        if (viewConfig.resourceType == resourceType) {
          return true;
        }

        // Finally, a resourceType of null means this should match any
        // kind of resourceType.
        if (viewConfig.resourceType === null) {
          return true;
        }
      });

      return matchingView ? matchingView.stateName : null;
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