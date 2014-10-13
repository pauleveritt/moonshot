(function () {

  function RestLogger($q, $log) {

    return {
      request: function (config) {
        var isApi = config.url.substring(0, 5) == '/api/';
        if (1==1) {
          $log.info('request url/method/data',
                    config.url, config.method, config.data);
        }
        return config || $q.when(config);
      },
      response: function (response) {
        var config = response.config;
        var isApi = config.url.substring(0, 5) == '/api/';
        if (1==1) {
          var response_data = response.data;
          $log.info('response url/method/data',
                    config.url, config.method);
        }
        return response || $q.when(response);
      }
    };
  }


  function ModuleInit($httpProvider) {

    $httpProvider.interceptors.push('restLogger');
  }

  angular.module("moonshot")
    .factory('restLogger', RestLogger)
    .config(ModuleInit);

})
();
