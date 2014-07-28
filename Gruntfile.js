module.exports = function (grunt) {

  // autoload the plugins
  require('load-grunt-tasks')(grunt);

  grunt.initConfig(
    {
      pkg: grunt.file.readJSON("package.json"),
      meta: {
        banner: "/*!\n* <%= pkg.name %> - v<%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"
      },
      sources: {
        js: [
          "bower_components/angular/angular.js",
          "bower_components/angular-animate/angular-animate.js",
          "bower_components/angular-ui-router/release/angular-ui-router.js",
          "bower_components/restangular/dist/restangular.js",
          "bower_components/lodash/dist/lodash.js"
        ],
        devjs: [
          "bower_components/angular-mocks/angular-mocks.js"
        ],
        appjs: ["src/module.js", "src/*/*.js"],
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
              libjs: "<%= sources.devjs %>",
              appjs: ["module.js", "app/app.js", "todo/controllers.js", "todo/states.js"]
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
              js: ["js/lib-all.min.js", "js/app-all.js", "js/ngtemplates.js"]
            }
          },
          files: {
            "dist/index.html": ["src/index.tpl.html"]
          }
        }

      },

      ngtemplates: {
        moonshot: {
          cwd: "src/",
          src: "**/*.partial.html",
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
        libjs: {
          files: [
            {
              src: "<%= sources.js %>",
              dest: "dist/js/lib-all.js"
            }
          ]
        },
        appjs: {
          files: [
            {
              src: "<%= sources.appjs %>",
              dest: "dist/js/app-all.js"
            }
          ]
        }
      },

      uglify: {
        options: {
          banner: "<%= meta.banner %>",
          sourceMap: true
        },
        lib: {
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
          interval: 100
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
        },
        tmp: {
          files: ["tmp/*/*"],
          tasks: [],
          spawn: false,
          interrupt: true
        }
      }

    }
  );

  grunt.registerTask(
    "default", [
      // Stuff related to development
      "newer:less", "newer:template:dev",
      // Stuff related to production
      "ngtemplates", "newer:concat",
      // Start the server
      "connect:dev",
      "watch"
    ]);
  grunt.registerTask(
    "dist",
    ["template:dist", "uglify", "cssmin", "copy"]
  )

};