(function () {

  function Traverser() {
    this.x = 1;
    this.userTraversal = true; // Let traversal be disabled at config

    this._views = {};

    this.getViewMap = function () {
      // Walk all the states looking for view declarations, then
      // arrange by view name, then view declarations in priority

    };

    this.resolvePath = function (path) {
      var r = {
        context: {
          id: 193, title: "Some Document", _self: '/s/1/3',
          type: 'document'},
        parents: [1,2,3],
        viewName: 'edit'
      };

      return r;
    };

    this.transitionTo = function (context, viewName, parents) {
      // If the state map isn't generated, then generate it
      var views = this.getViewMap();

      // Find all view declarations for this viewName

      // Based on priority settings,
    }
  }

  angular.module("moonshot")
    .service("Traverser", Traverser);

})();