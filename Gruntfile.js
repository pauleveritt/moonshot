module.exports = function (grunt) {


//  // measures the time each task takes
//  require('time-grunt')(grunt);

  // autoload the plugins
  require('load-grunt-tasks')(grunt);
  var _ = require('lodash');

  grunt.initConfig(
    {
      pkg: grunt.file.readJSON("package.json"),
      meta: {
        banner: "/*!\n* <%= pkg.name %> - v<%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      sources: {
        js: [
          "bower_components/angular/angular.js",
          "bower_components/angular-route/angular-route.js",
          "bower_components/angular-resource/angular-resource.js",
          "bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
          "bower_components/lodash/dist/lodash.js"
        ],
        devjs: [
          "bower_components/angular-mocks/angular-mocks.js",
          "app/app.js"
        ],
        css: [
          "bower_components/bootstrap/dist/css/bootstrap.css",
          "bower_components/font-awesome/css/font-awesome.css"
        ],
        fonts: [
          "bower_components/bootstrap/dist/fonts/*",
          "bower_components/font-awesome/fonts/*"
        ],
        img: [
          "src/img/*"
        ]
      },

      less: {
        default: {
          files: {
            "src/css/app-styles.css": "src/app-styles.less"
          }
        }
      },

      template: {
        dev: {
          options: {
            data: {
              mode: "dev",
              prefix: "../",
              css: "<%= sources.css %>",
              js: "<%= sources.js %>",
              devjs: "<%= sources.devjs %>"

            }
          },
          files: {
            "src/index.html": ["src/index.tpl.html"]
          }
        },
        dist: {
          options: {
            data: {
              mode: "dist",
              prefix: "",
              css: ["css/lib-all.min.css", "css/app-styles.css"],
              js: ["js/lib-all.min.js", "js/app-all.js"],
              devjs: []
            }
          },
          files: {
            "dist/index.html": ["src/index.tpl.html"]
          }
        }

      },

      ngtemplates: {
        apptemplates: {
          options: {
            prefix: "/",
            standalone: true
          },
          src: "src/**/*.partial.html",
          dest: "dist/js/ngtemplates.js"
        }
      },

      concat: {
        options: {
          banner: "<%= meta.banner %>"
        },
        css: {
          files: [
            {
              src: "<%= sources.css %>",
              dest: "dist/css/lib-all.css"
            }
          ]
        },
        js: {
          files: [
            {
              src: "<%= sources.js %>",
              dest: "dist/js/lib-all.js"
            }
          ]
        }
      },

      uglify: {
        options: {
          banner: "<%= meta.banner %>"
        },
        build: {
          src: "dist/js/lib-all.js",
          dest: "dist/js/lib-all.min.js"
        }
      },

      cssmin: {
        options: {
          banner: "<%= meta.banner %>"
        },
        dist: {
          src: "dist/css/lib-all.css",
          dest: "dist/css/lib-all.min.css"
        }
      },

      copy: {
        css: {
          expand: true,
          src: "src/css/app-styles.css",
          flatten: true,
          dest: "dist/css"
        },
        js: {
          expand: true,
          src: ["src/*/*.js"],
          flatten: true,
          dest: "dist/js"
        },
        fonts: {
          expand: true,
          src: "<%= sources.fonts %>",
          flatten: true,
          dest: "dist/fonts"
        },
        img: {
          expand: true,
          src: "<%= sources.img %>",
          flatten: true,
          dest: "dist/img"
        }
      },

      connect: {
        dev: {
          options: {
            port: 9000,
            livereload: true,
            base: "."
          }
        }
      },

      watch: {
        options: {
          livereload: true,
          interval: 300
        },
        css: {
          files: ["src/**/*.less"],
          tasks: ["less"],
          spawn: false,
          interrupt: true
        },
        js: {
          files: ["src/**/*.js"],
          tasks: [],
          spawn: false,
          interrupt: true
        },
        template: {
          files: ["src/index.tpl.html"],
          tasks: ["template"],
          spawn: false,
          interrupt: true
        },
        ngtemplates: {
          files: ["src/*/*.partial.html"],
          tasks: ["ngtemplates"],
          spawn: false,
          interrupt: true
        }

      }

    }
  );

  grunt.registerTask(
    "default", [
      // Stuff related to development
      "less", "template",
      // Stuff related to production
      "newer:ngtemplates", "newer:concat", "newer:uglify",
      "newer:cssmin", "newer:copy",
      // Start the server
      "connect:dev", "watch"]);

};