(function () {

  function Traverser($http) {
    var _this = this;

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
    this.resetViewMap = function() {
      // Reset viewMap
      _this.viewMap = {};
    };
    this.addStateToViewMap = function(state) {
      // Add a new state to viewMap (without best-match ordering)
      var vc = state.viewConfig;
      var viewName;
      var tmpElem;
      if (vc) {
        // This state has a viewConfig
        viewName = vc.name;
        tmpElem =  {
          name: viewName,
          resourceType: vc.resourceType,
          stateName: state.name,
          containment: vc.containment,
          marker: vc.marker
        };

        // If the viewMap doesn't yet have this
        // viewName, add it with an empty seq
        if (!_this.viewMap[viewName]) {
          _this.viewMap[viewName] = [tmpElem];
        }
        else {
          _this.viewMap[viewName].push(tmpElem);
        }
      }
    };
    this.updateTraversal = function () {
      // Update _this.disableTraversal property if _this.viewMap is empty
      _this.disableTraversal = _.isEmpty(_this.viewMap);
    };
    this.orderViewMap = function () {
      // Post processing of viewMap with best match order
      _(_this.viewMap)
        .forEach(function (value, key) {
          _this.viewMap[key] = _(_this.viewMap[key])
            .chain()
            .sortBy(function (item) {
              return item.marker;
              })
            .sortBy(function (item) {
              return item.containment;
              })
            .sortBy(function (item) {
              return item.marker;
              })
            .value();
        });
    };
    this.makeViewMap = function (states) {
      // reset view map
      _this.resetViewMap();

      // add (only viewConfig based) states to viewMap
      _(states)
        .filter(function (state) {
          return _.has(state, "viewConfig");
          })
        .forEach(_this.addStateToViewMap);

      // Post processing of viewMap with best match order
      _this.orderViewMap();

      // Update _this.disableTraversal property if _this.viewMap is empty
      _this.updateTraversal();
    };

    this.resolvePath = function (path) {
      return $http.get('/api' + path);
    };

    this.resolveState = function (context, viewName, parents) {
      // Based on request info, find the matching view in the view
      // map based on priority.
      var views, parentTypes, matchingView, i, view;

      // Get the view matching this resolved viewName from the viewMap
      views = _this.viewMap[viewName];

      // Get some of the data needed by the predicates
      parentTypes = _.uniq(_.map(parents, function (p) {
        return p.resourceType;
      }));
//        markers = _.map(parents, function (p) {
//          return p.markers;
//        }),
//        parentMarkers = _.uniq(_.flatten(markers)),
      markers = context.markers;
      pathInfo = context.path;

      // Go through all the views, assigning a score
      matchingView = null;
      for (i=0; i<views.length; i++) {
        viewConfig = views[i];

        if (viewConfig.resourceType) {
          if (viewConfig.resourceType !== resourceType) {
              continue;
          }
        }
        if (viewConfig.containment) {
          if (! _.contains(parentTypes, viewConfig.containment)) {
              continue;
          }
        }
        if (viewConfig.marker) {
          if (! _.contains(markers, viewConfig.marker)) {
            continue
          }
        }
        if (viewConfig.pathInfo) {
          if (! _.contains(pathInfo, viewConfig.pathInfo)) {
            continue;
          }
        };

        return viewConfig.stateName;
        
      }
/*      viewResults = _.map(views, function (viewConfig) {
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

      return matchingView;
*/
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
