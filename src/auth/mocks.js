(function () {

  function ModuleInit(moonshotMockRestProvider) {

    moonshotMockRestProvider.addMock(
      'authenticate',
      [
        [
          'POST',
          /api\/auth\/login/,
          function (method, url, data) {
            data = angular.fromJson(data);
            var un = data.username;
            var pw = data.password;
            var response;

            if (un === 'admin') {
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

