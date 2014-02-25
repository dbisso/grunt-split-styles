'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.split_styles = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  ie8_styles: function(test) {
    test.expect(2);

    var actualExtracted = grunt.file.read('tmp/ie8_styles/extracted.css').trim();
    var actualRemaining = grunt.file.read('tmp/ie8_styles/remaining.css').trim();

    var expectedExtracted = grunt.file.read('test/expected/ie8-styles.css').trim();
    var expectedRemaining = grunt.file.read('test/expected/without-ie8-styles.css').trim();

    test.equal(actualExtracted, expectedExtracted, 'should create a file with only styles starting with .ie8.');
    test.equal(actualRemaining, expectedRemaining, 'should remove styles starting with .ie8.');


    test.done();
  },
  ie8_styles_dont_remove: function(test) {
    test.expect(2);

    var actualExtracted = grunt.file.read('tmp/ie8_styles_dont_remove/extracted.css').trim();
    var actualRemaining = grunt.file.read('tmp/ie8_styles_dont_remove/remaining.css').trim();

    var expectedExtracted = grunt.file.read('test/expected/ie8-styles.css').trim();
    var expectedRemaining = grunt.file.read('test/expected/with-ie8-styles.css').trim();

    test.equal(actualExtracted, expectedExtracted, 'should create a file with only styles starting with .ie8.');
    test.equal(actualRemaining, expectedRemaining, 'should keep styles starting with .ie8.');


    test.done();
  },
  media_queries_all: function(test) {
    test.expect(2);

    var actualExtracted = grunt.file.read('tmp/media_queries_all/extracted.css').trim();
    var actualRemaining = grunt.file.read('tmp/media_queries_all/remaining.css').trim();

    var expectedExtracted = grunt.file.read('test/expected/all-media-queries.css');
    var expectedRemaining = grunt.file.read('test/expected/empty.css');

    test.equal(actualExtracted, expectedExtracted, 'should create a file with all the media queries.');
    test.equal(actualRemaining, expectedRemaining, 'should remove all media queries.');

    test.done();
  },
  media_queries_em: function(test) {
    test.expect(2);

    var actualExtracted = grunt.file.read('tmp/media_queries_em/extracted.css').trim();
    var actualRemaining = grunt.file.read('tmp/media_queries_em/remaining.css').trim();

    var expectedExtracted = grunt.file.read('test/expected/only-em-media-queries.css').trim();
    var expectedRemaining = grunt.file.read('test/expected/only-px-media-queries.css').trim();

    test.equal(actualExtracted, expectedExtracted, 'should create a file only em-based min-width media queries.');
    test.equal(actualRemaining, expectedRemaining, 'should remove all em-based min-width media queries.');

    test.done();
  },
  media_queries_px: function(test) {
    test.expect(2);

    var actualExtracted = grunt.file.read('tmp/media_queries_px/extracted.css').trim();
    var actualRemaining = grunt.file.read('tmp/media_queries_px/remaining.css').trim();

    var expectedExtracted = grunt.file.read('test/expected/only-px-media-queries.css').trim();
    var expectedRemaining = grunt.file.read('test/expected/only-em-media-queries.css').trim();

    test.equal(actualExtracted, expectedExtracted, 'should create a file only pixel-based min-width media queries.');
    test.equal(actualRemaining, expectedRemaining, 'should remove all pixel-based min-width media queries.');

    test.done();
  },
  media_queries_em_unwrap: function(test) {
    test.expect(1);

    var actualExtracted = grunt.file.read('tmp/media_queries_em_unwrap/extracted.css').trim();
    var expectedExtracted = grunt.file.read('test/expected/only-em-media-queries-unwrapped.css').trim();

    test.equal(actualExtracted, expectedExtracted, 'should create a file with only child declarations of em-based min-width media queries.');

    test.done();
  },
  with_media_parent: function(test) {
    test.expect(1);

    var actualExtracted = grunt.file.read('tmp/with_media_parent/extracted.css').trim();
    var expectedExtracted = grunt.file.read('test/expected/class-with-media-parent.css').trim();

    test.equal(actualExtracted, expectedExtracted, 'should extract the class and its parent media node.');

    test.done();
  },
  without_media_parent: function(test) {
    test.expect(1);

    var actualExtracted = grunt.file.read('tmp/without_media_parent/extracted.css').trim();
    var expectedExtracted = grunt.file.read('test/expected/class-without-media-parent.css').trim();

    test.equal(actualExtracted, expectedExtracted, 'should extract the class and its parent media node.');

    test.done();
  }
};
