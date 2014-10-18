(function () {

  function FoldersHomeCtrl() {

  }

  function RootFolderDefaultCtrl(Traverser) {
    this.context = Traverser.context;
    console.debug('Traverser', Traverser);
  }


  angular.module("moonshot")
    .controller("FoldersHomeCtrl", FoldersHomeCtrl)
    .controller("RootFolderDefaultCtrl", RootFolderDefaultCtrl);


})();