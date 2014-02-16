/*
 * grunt-split-styles
 *
 * Copyright (c) 2014 Dan Bissonnet
 * Licensed under the MIT license.
 */

'use strict';
var postcss = require('postcss');

module.exports = function(grunt) {


	grunt.registerMultiTask('split_styles', 'Split a CSS file based on selectors. Useful of old IE stylesheets', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			separator: '', // do we need this?
			pattern: false, // The RegExp to match selectors with
			remove: true, // Should we strip the matched rules from the src style sheet?
			mediaPattern: false, // RegExp to match @media rules with
			sourceMap: false
		});

		var newCSS = postcss.root();
		// Please see the Grunt documentation for more information regarding task
		// creation: http://gruntjs.com/creating-tasks

		// Our postCSS processor
		var contenter = postcss(function (css) {
			if ( options.pattern ) {
				css.eachRule(function (rule) {
						if ( rule.selector.match(options.pattern) ) {
								if ( options.remove ) {
									rule.removeSelf();
								}
								newCSS.append(rule);
						}
				});
			}

			if (options.mediaPattern) {
				css.eachAtRule(function (atRule) {
					if ( 'media' === atRule.name && atRule.params.match(options.mediaPattern) ) {

						if ( options.remove ) {
							atRule.removeSelf();
						}

						newCSS.append(atRule);
					}
				});
			}
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// Read file source.
				grunt.log.warn(filepath);
				var css =  grunt.file.read(filepath),
						processOptions = {},
						output;

				if ( options.sourceMap ) {
					grunt.log.write(typeof options.sourceMap);
					processOptions.map = grunt.file.read( options.sourceMap );
					processOptions.from = filepath;
					processOptions.to = f.dest;
				}

				// Run the postprocessor
				output = contenter.process(css, processOptions);

				if ( output.map.length > 0 ) {
					grunt.file.write(options.sourceMap, output.map);
				}

				return output.css;
			}).join(grunt.util.normalizelf(options.separator));

			// Write the newly split file.
			grunt.file.write(options.output, newCSS);

			// Write the destination file
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + options.output + '" created.');
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});
};