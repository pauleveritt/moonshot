(function () {

  function FoldersHomeCtrl() {

  }

  function RootFolderDefaultCtrl(Traverser) {
    this.context = Traverser.context;
  }

  function FolderDefaultCtrl(Traverser) {
    this.context = Traverser.context;
  }


  angular.module("moonshot")
    .controller("FoldersHomeCtrl", FoldersHomeCtrl)
    .controller("RootFolderDefaultCtrl", RootFolderDefaultCtrl)
    .controller("FolderDefaultCtrl", FolderDefaultCtrl);


})();