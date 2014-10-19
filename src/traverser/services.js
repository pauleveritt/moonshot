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
        markers = _.map(parents, function (p) {
          return p.markers;
        }),
        parentMarkers = _.uniq(_.flatten(markers)),
        pathInfo = context.path;


      var matchingView = _.find(views, function (viewConfig) {
        // Predicate calculations for this viewConfig against the
        // current context/viewName/parents/etc.

        // Initialize all the possible predicates
        var
          isResourceType = false,
          inParentTypes = false,
          inParentMarkers = false,
          inPathInfo = false;

        // If this viewConfig states each predicate case, and it matches,
        // set to true.
        if (!_.has(viewConfig, 'resourceType')) {
          // Special case...if the viewConfig does *not* specify a
          // resourceType, it means match any resourceType;
          isResourceType = true;
        }
        if (viewConfig.resourceType) {
          isResourceType = viewConfig.resourceType === resourceType;
        }
        if (viewConfig.containment) {
          inParentTypes = _.contains(parentTypes, viewConfig.contains);
        }
        if (viewConfig.marker) {
          inParentMarkers = _.contains(parentMarkers, viewConfig.marker);
        }
        if (viewConfig.pathInfo) {
          inPathInfo = _.contains(pathInfo, viewConfig.pathInfo);
        }

        // Now do the resolution based on precedence.
        // Speed up by using inversion. A nested if starting with the
        // *least* precedence.
        if (isResourceType) {
          // Least prececence: resource type of context
          if (inParentTypes) {
            // Next least precedence: resource types of parents
            if (inPathInfo) {
              // Next least precedence: context in a certain path
              if (inParentMarkers) {
                // Highest level of precedence
                return true;
              }
              return true;
            }
            return true;
          }
          return true;
        }

        // Nothing matched, return false;
        return false;
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