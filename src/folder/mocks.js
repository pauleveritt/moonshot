(function () {

  function ModuleInit(moonshotMockRestProvider) {

    var
      f1 = {path: '/root/folder1', id: 1, resourceType: 'Folder',
        title: 'Folder One', viewName: 'default', items: []},
      f2 = {path: '/root/folder2', id: 2, resourceType: 'Folder',
        title: 'Another Folder', viewName: 'default', items: []},
      rf = {path: '/root', id: 0, resourceType: 'RootFolder',
        title: 'Root Folder', viewName: 'default', items: [f1, f2]};

    var sampleData = [f1, f2, rf]

    function resolvePath(method, url, data) {
      /* Given a path, return context, viewName, parents */

      var path = url.substring(4);
      var context = _.find(sampleData, {path: path});
      var viewName = context.viewName;
      var parents = [];
      var responseData = {context: context, viewName: viewName, parents: parents};

      return [200, {data: responseData}];
    }

    moonshotMockRestProvider.addMock(
      'traverser',
      [
        ['GET', /api\/root/, resolvePath]
      ]);
  }

  angular.module('moonshot')
    .config(ModuleInit);

})();

