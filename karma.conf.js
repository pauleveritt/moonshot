// Karma configuration
// Generated on Tue Nov 26 2013 16:25:36 GMT-0500 (EST)

module.exports = function (config) {
  config.set(
    {

      // list of files / patterns to load in the browser
      files: [
        "dist/js/lib-all.min.js",
        "bower_components/angular-mocks/angular-mocks.js",

        "src/module.js",
        "src/*/*.js",
        "dist/js/ngtemplates.js",
        "src/*/tests/*specs.js"
      ],

      // base path, that will be used to resolve files and exclude
      logLevel: config.LOG_DEBUG,

      // frameworks to use
      frameworks: ["jasmine"],

      browsers: ["PhantomJS"],
//            browsers: ["Chrome"],

      // coverage reporter generates the coverage
      reporters: ["progress", "junit", "coverage"],

      preprocessors: {
        "src/*/*.js": ["coverage"]
      },

      junitReporter: {
        outputFile: "karma-test-results.xml"
      },

      coverageReporter: {
        type: "cobertura",
        dir: "coverage/",
        file: "coverage.xml"
      }


    });
};
