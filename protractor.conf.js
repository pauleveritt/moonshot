// An example configuration file.
exports.config = {

  // Using Chrome
  chromeOnly: true,
  chromeDriver: 'node_modules/chromedriver/bin/chromedriver',


  // Using PhantomJS, must start webdriver first using:
  //   node_modules/protractor/bin/webdriver-manager start
//  seleniumAddress: 'http://localhost:4444/wd/hub',
//  capabilities: {
//    browserName: "phantomjs"
//  },

  baseUrl: 'http://localhost:9000/',

  specs: [
    "src/**/e2e/*.specs.js"
  ]

};