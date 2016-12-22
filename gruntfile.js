module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      build: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js', 'test/**/*.js']
    },

    //mochaTest: {
    //  test: {
    //    options: {
    //      reporter: 'spec',
    //      captureFile: 'results.txt', // Optionally capture the reporter output to a file
    //      quiet: false, // Optionally suppress output to standard out (defaults to false)
    //      clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
    //      noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
    //    },
    //    src: ['test/**/*.js']
    //  }
    //},

    mocha_istanbul: {
            coverage: {
                src: 'test', // a folder works nicely
                options: {
                    mask: '**/*.js'
                }
            },
            coveralls: {
                src: ['test'], // multiple folders also works
                options: {
                    coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
                    check: {
                        lines: 75,
                        statements: 75
                    },
                    mask: '**/*.js',
                    root: './api', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['cobertura','lcovonly']
                }
            }
        },
        istanbul_check_coverage: {
          default: {
            options: {
              coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
              check: {
                lines: 80,
                statements: 80
              }
            }
          }
        },

      watch: {
        scripts: { 
          files: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js', 'test/**/*.js'], tasks: ['jshint', 'mocha_istanbul'] 
        }
      }, 

  });

  grunt.event.on('coverage', function(lcovFileContents, done){
        // Check below on the section "The coverage event"
        done();
    });

  grunt.registerTask('default', ['jshint', 'mochaTest', 'mocha_istanbul']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  
};