(function () {

  function ModuleInit(moonshotMockRestProvider) {

    var user = {
      id: 'admin',
      email: 'admin@x.com',
      first_name: 'Admin',
      last_name: 'Lastie',
      twitter: 'admin'
    };

    moonshotMockRestProvider.addMock(
      'auth',
      [
        [
          'POST',
          /api\/auth\/login/,
          function (method, url, data) {
            data = angular.fromJson(data);
            var un = data.username;
            var response;

            if (un === 'admin') {
              response = [204, {token: "mocktoken"}];
            } else {
              response = [401, {"message": "Invalid login or password"}];
            }

            return response;
          }],
        [
          'GET', /api\/me/,
          function () {
            return [200, {user: user}];
          }
        ]
      ]);
  }

  angular.module('moonshot')
    .config(ModuleInit);

})();

