(function () {

  function ModuleInit(moonshotMockRestProvider) {

    var usersData = {
      data: [
        {
          'id': 'bob',
          'title': 'Bob Jones'
        }
      ]
    };

    moonshotMockRestProvider.addMock(
      'users',
      [
        [
          'GET',
          /api\/users$/,
          function () {
            return [200, usersData];
          }]
      ]);
  }

  angular.module('moonshot')
    .config(ModuleInit);

})();

