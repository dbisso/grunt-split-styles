/*
 * grunt-split-styles
 *
 * Copyright (c) 2014 Dan Bissonnet
 * Licensed under the MIT license.
 */

'use strict';
var postcss = require('postcss');

module.exports = function(grunt) {
	grunt.registerMultiTask('split_styles', 'Split a CSS file based on selectors.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			pattern: {
				match: false, // The RegExp to match selectors with
				matchParent: false // Should child declarations (eg. in @media blocks) include their parent node.
			},
			remove: true, // Should we strip the matched rules from the src style sheet?
			mediaPattern: false, // RegExp to match @media rules with
			mediaPatternUnwrap: false, // Extract the rules from a matched @media block
			output: false // output file 'false' by default
		});

		var pattern = {};
		var newCSS = postcss.root();

		if ( options.pattern instanceof RegExp ) {
			pattern.match = options.pattern;
			pattern.matchParent = false;
		} else {
			pattern = options.pattern;
		}

		// Our postCSS processor
		var processor = postcss(function (css) {
			if ( pattern.match ) {
				css.eachRule(function (rule) {
						var parent;
						if ( rule.selector.match(pattern.match) ) {
							if ( options.remove ) {
								rule.removeSelf();
							}
							if ( pattern.matchParent ) {
								parent = rule.parent.clone();

								if ( 'media' === parent.name ) {
									parent.eachRule(function (childRule) {
										childRule.removeSelf();
									});
									parent.append(rule);
									newCSS.append(parent);
								} else {
									newCSS.append(rule);
								}
							} else {
								newCSS.append(rule);
							}
						}
				});
			}

			if (options.mediaPattern) {
				css.eachAtRule(function (atRule) {
					if ( 'media' === atRule.name && atRule.params.match(options.mediaPattern) ) {
						if ( options.remove ) {
							atRule.removeSelf();
						}
						if ( options.mediaPatternUnwrap ) {
							atRule.eachRule(function (rule) {
								newCSS.append(rule);
							});
						} else {
							newCSS.append(atRule);
						}
					}
				});
			}
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
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
				var css =  grunt.file.read(filepath),
						processOptions = {},
						output;

				processOptions.from = filepath;
				processOptions.to = f.dest;

				// Run the postprocessor
				output = processor.process(css, processOptions);

				if ( options.output && output.map && output.map.length > 0 ) {
					grunt.log.writeln('Sourcemap "' + options.output + '" created.');
					grunt.file.write( f.dest + '.map' , output.map);
				}

				return output.css;
			});

			// Write the newly split file.
			if(options.output) {
				grunt.file.write(options.output, newCSS);
			}

			// Write the destination file
			grunt.file.write(f.dest, src);

			// Print a success message.
			if(options.output) {
				grunt.log.writeln('File "' + options.output + '" created.');
			}
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});
};
