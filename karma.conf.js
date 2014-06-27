// Karma configuration
// Generated on Tue Nov 26 2013 16:25:36 GMT-0500 (EST)

module.exports = function (config) {
  config.set(
    {

      // list of files / patterns to load in the browser
      files: [
        'bower_components/angular/angular.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-resource/angular-resource.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-cookies/angular-cookies.js',
        'bower_components/lodash/dist/lodash.js',

        'dist/js/ngtemplates.js',
        'src/app/app.js',
        'src/mockRest.js',
        'src/common/interceptors.js',

        'src/and/and.js',
        'src/and/tests/*specs.js',
        'src/or/or.js',
        'src/or/tests/*specs.js',
        'src/absolute/absolute.js',
        'src/absolute/tests/*specs.js',
        'src/exclude/exclude.js',
        'src/exclude/tests/*specs.js',
        'src/relative/relative.js',
        'src/relative/tests/*specs.js',
        'src/withn/withn.js',
        'src/withn/tests/*specs.js',
        'src/toolkit/toolkit.js',
        'src/toolkit/tests/*specs.js',

        'src/project/resources.js',
        'src/project/tests/*.specs.js',

        'src/completed/completed.js',
        'src/completed/tests/*.specs.js',
        'src/tooltip/tooltip.js',
        'src/tooltip/tests/*specs.js',
        'src/removenode/removenode.js',
        'src/removenode/tests/*specs.js',
        'src/genomic/tests/*specs.js',
        'src/genomic/genomic.js',

        'src/dashboard/dashboard.js',
        'src/dashboard/tests/*specs.js',
        'src/query/query.js',
        'src/query/tests/*specs.js',

        'src/clobject/clobject.js',
        'src/clobject/tests/*specs.js'
      ],

      // base path, that will be used to resolve files and exclude
      logLevel: config.LOG_DEBUG,

      // frameworks to use
      frameworks: ['jasmine'],

      browsers: ['PhantomJS'],
//            browsers: ['Chrome'],

      // coverage reporter generates the coverage
      reporters: ['progress', 'junit', 'coverage'],

      preprocessors: {
        'src/*/*.js': ['coverage']
      },

      junitReporter: {
        outputFile: 'plt-karma-test-results.xml'
      },

      coverageReporter: {
        type: 'cobertura',
        dir: 'coverage/',
        file: 'coverage.xml'
      }


    });
};
