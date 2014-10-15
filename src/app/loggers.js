(function () {

  function RestLogger($q, $log, $injector) {

    return {
      request: function (config) {
        var isApi = config.url.substring(0, 5) == '/api/';
        if (1 == 1) {
          $log.info('request url/method/data',
                    config.url, config.method, config.data);
        }
        return config || $q.when(config);
      },
      response: function (response) {
        var config = response.config;
        var isApi = config.url.substring(0, 5) == '/api/';
        if (1 == 1) {
          var response_data = response.data;
          $log.info('response url/method/data',
                    config.url, config.method, response.data);
        }
        return response || $q.when(response);
      },
      responseError: function (rejection) {
        // Handle any 500 errors from the server with an alert
        var $alert = $injector.get('$alert');

        var url = rejection.config.url;
        if (rejection.status == 500) {
          var msg = 'Server error at: ' + url;
          $alert({
                   content: msg,
                   animation: 'fadeZoomFadeDown',
                   type: 'material',
                   duration: 3
                 });
        }
        return $q.reject(rejection);
      }

    };
  }


  function ModuleInit($httpProvider) {

    $httpProvider.interceptors.push('restLogger');
  }

  angular.module("moonshot")
    .factory('restLogger', RestLogger)
    .config(ModuleInit);

})();