(function () {

  function Traverser() {
    this.x = 1;
    this.userTraversal = true; // Let traversal be disabled at config
  }

  angular.module("moonshot")
    .service("Traverser", Traverser);

})();