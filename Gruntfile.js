/*
 * grunt-split-styles
 * 
 *
 * Copyright (c) 2014 Dan Bissonnet
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
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    split_styles: {
      ie8_styles: {
        options: {
          pattern: /\.ie8/,
          output: 'tmp/ie8_styles/extracted.css',
        },
        files: {
          'tmp/ie8_styles/remaining.css': 'test/fixtures/with-ie8-styles.css'
        }
      },
      ie8_styles_pattern_object: {
        options: {
          pattern: {
            match: /\.ie8/
          },
          output: 'tmp/ie8_styles_pattern_object/extracted.css',
        },
        files: {
          'tmp/ie8_styles_pattern_object/remaining.css': 'test/fixtures/with-ie8-styles.css'
        }
      },
      ie8_styles_dont_remove: {
        options: {
          pattern: /\.ie8/,
          output: 'tmp/ie8_styles_dont_remove/extracted.css',
          remove: false
        },
        files: {
          'tmp/ie8_styles_dont_remove/remaining.css': 'test/fixtures/with-ie8-styles.css'
        }
      },
      media_queries_all: {
        options: {
          output: 'tmp/media_queries_all/extracted.css',
          mediaPattern: /./,
        },
        files: {
          'tmp/media_queries_all/remaining.css': 'test/fixtures/media-queries.css'
        }
      },
      media_queries_em: {
        options: {
          output: 'tmp/media_queries_em/extracted.css',
          mediaPattern: /min-width: (\d+)em/,
        },
        files: {
          'tmp/media_queries_em/remaining.css': 'test/fixtures/media-queries.css'
        }
      },
      media_queries_px: {
        options: {
          output: 'tmp/media_queries_px/extracted.css',
          mediaPattern: /min-width: (\d+)px/,
        },
        files: {
          'tmp/media_queries_px/remaining.css': 'test/fixtures/media-queries.css'
        }
      },
      media_queries_em_unwrap: {
        options: {
          output: 'tmp/media_queries_em_unwrap/extracted.css',
          mediaPattern: /min-width: (\d+)em/,
          mediaPatternUnwrap: true,
          remove: false
        },
        files: {
          'tmp/media_queries_em_unwrap/remaining.css': 'test/fixtures/media-queries.css'
        }
      },
      with_media_parent: {
        options: {
          output: 'tmp/with_media_parent/extracted.css',
          pattern: {
            match: /\.a-class/,
            matchParent: true
          }
        },
        files: {
          'tmp/with_media_parent/remaining.css': 'test/fixtures/media-queries.css'
        }
      },
      without_media_parent: {
        options: {
          output: 'tmp/without_media_parent/extracted.css',
          pattern: /\.a-class/
        },
        files: {
          'tmp/without_media_parent/remaining.css': 'test/fixtures/media-queries.css'
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'split_styles', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
