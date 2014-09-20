(function () {

  function ModuleInit(moonshotMockRestProvider) {

    var usersData = [
      {
        'id': 'i1',
        'title': 'Milk'
      }
    ];
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

    moonshotMockRestProvider.addMock(
      'authenticate',
      [
        [
          'POST',
          /api\/authenticate/,
          function (method, url, data) {
            data = angular.fromJson(data);
            var un = data.username;
            var pw = data.password;
            var response;

            if (un === 'paul') {
              response = [204, {}];
            } else {
              response = [401, {"message": "Invalid login or password"}];
            }

            return response;
          }]
      ]);
  }

  angular.module('moonshot')
    .config(ModuleInit);

})();

