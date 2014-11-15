/*
 * grunt-translate
 * https://github.com/emonidi/grunt-translate
 *
 * Copyright (c) 2014 Emiliyan Gospodinov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    translate: {
      default_options: {
        options: {
          dir: './test/fixtures/',
          template: 'en_en.json',
          translateTo: [
            {
              file: 'en_en',
              langCode: 'en',
              main:true,
            },
            {
              file: 'es_es',
              langCode: 'es'
            },
            {
              file: 'de_de',
              langCode: 'de'
            },
            {
              file: 'ro_ro',
              langCode: 'ro'
            }
          ],
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'translate', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
