// Karma configuration
// Generated on Tue Nov 26 2013 16:25:36 GMT-0500 (EST)

module.exports = function (config) {
  config.set(
    {

      // list of files / patterns to load in the browser
      files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/restangular/dist/restangular.js',
        'bower_components/lodash/dist/lodash.js',
        'bower_components/satellizer/satellizer.js',
        'bower_components/angular-strap/dist/angular-strap.js',

        // Common stuff
        'src/module.js',

        'src/traverser/init.js',
        'src/traverser/services.js',
        'src/traverser/tests/service.specs.js'
      ],

      // base path, that will be used to resolve files and exclude
      logLevel: config.LOG_DEBUG,

      // frameworks to use
      frameworks: ["jasmine"],

      browsers: ["PhantomJS"],
//            browsers: ["Chrome"],

      reporters: ["progress", "junit"],

      preprocessors: {
      },

      junitReporter: {
        outputFile: "karma-test-results.xml"
      }

    });
};