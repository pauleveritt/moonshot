(function () {

  function MoonshotInit($authProvider) {

    $authProvider.google(
      {
        url: '/auth/google',
        clientId: '10769429454-33t5ven7qm8jsmh2p0mp6848mlupe5t3.apps.googleusercontent.com'
      }
    );
  }

  angular.module("moonshot")
    .config(MoonshotInit);

})();