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
                         stateName: state.name,
                         marker: vc.marker
                       }
                     );

                   }
                 });

      this.disableTraversal = _.isEmpty(this.viewMap);
    };

    this.resolvePath = function (path) {
      return $http.get('/api' + path);
    };

    this.resolveState = function (context, viewName, parents) {
      // Based on request info, find the matching view in the view
      // map based on priority.

      // Get the view matching this resolved viewName from the viewMap
      var views = _this.viewMap[viewName];

      // Get some of the data needed by the predicates
      var
        resourceType = context.resourceType,
        parentTypes = _.uniq(_.map(parents, function (p) {
          return p.resourceType;
        })),
//        markers = _.map(parents, function (p) {
//          return p.markers;
//        }),
//        parentMarkers = _.uniq(_.flatten(markers)),
        markers = context.markers;
      pathInfo = context.path;

      // Go through all the views, assigning a score
      var matchingView = null;
      var viewResults = _.map(views, function (viewConfig) {
        if (!matchingView) {
          // Initialize all the possible predicates
          var r = {stateName: viewConfig.stateName};
          r.isResourceType = false;
          r.inParentTypes = false;
          r.inMarkers = false;
//          inParentMarkers = false,
          r.inPathInfo = false;

          r.score = 0;


          // If this viewConfig states each predicate case, and it matches,
          // set to true.

          if (!_.has(viewConfig, 'resourceType')) {
            // Special case...if the viewConfig does *not* specify a
            // resourceType, it means match any resourceType;
            r.isResourceType = true;
          }
          if (viewConfig.resourceType) {
            r.isResourceType = viewConfig.resourceType === resourceType;
          }
          if (viewConfig.containment) {
            r.inParentTypes = _.contains(parentTypes, viewConfig.containment);
          }
          if (viewConfig.marker) {
//          inParentMarkers = _.contains(parentMarkers, viewConfig.marker);
            r.inMarkers = _.contains(markers, viewConfig.marker);
          }
          if (viewConfig.pathInfo) {
            r.inPathInfo = _.contains(pathInfo, viewConfig.pathInfo);
          }

          return r;
        }
      });

      console.debug(488448, viewResults);

      return matchingView;
    };

    this.transitionTo = function (context, viewName, parents) {
      // If the state map isn't generated, then generate it
      var views = this.getViewMap();

      // Find all view declarations for this viewName

      // Based on priority settings,
    };
  }

  angular.module("traverser", [])
    .service("Traverser", Traverser);

})();
