(function () {

  function MoonshotInit($authProvider) {

    $authProvider.twitter({
                            url: 'http://localhost:3000/auth/twitter',
                            type: '1.0'
                          });
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();