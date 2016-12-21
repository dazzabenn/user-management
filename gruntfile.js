module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      build: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js', 'test/**/*.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      scripts: { 
        files: ['Gruntfile.js', 'api/**/*.js', 'config/**/*.js', 'test/**/*.js'], tasks: ['jshint', 'mochaTest'] 
      }
    }, 

  });

  grunt.registerTask('default', ['jshint', 'mochaTest']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  
};