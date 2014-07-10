// An example configuration file.
exports.config = {
    chromeOnly: true,
    chromeDriver: 'node_modules/chromedriver/bin/chromedriver',

    // Capabilities to be passed to the webdriver instance.
//    capabilities: {
//      browserName: "phantomjs"
//    },

    baseUrl: 'http://localhost:9000/',

    specs: [
        "src/**/*.specs.js"
    ]

};