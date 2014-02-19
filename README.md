# grunt-split-styles

> Split a CSS file based on selectors. Useful for old IE stylesheets.

## Credit

Uses the excellent [PostCSS](https://github.com/ai/postcss) for the actual CSS post-processing.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-split-styles --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-split-styles');
```

## The "split_styles" task

### Overview
In your project's Gruntfile, add a section named `split_styles` to the data object passed into `grunt.initConfig()`.

### Options

#### options.pattern
Type: `RegExp`

Selectors matching this regular expression will be added to the output file.

#### options.output
Type: `String`

The new CSS file to copy the matching rulesets to.

#### options.remove
Type: `Boolean`
Default value: `true`

Whether or not to remove the matching rulesets from the original stylesheet.

#### options.mediaPattern
Type: `RegExp`

`@media` rulesets matching this regular expression will be copied into the new stylesheet


### Usage Examples

#### Splitting IE styles into their own stylesheet

Here we take an input: `style.css` and extract the rules whose selectors start with `.ie6`, `.ie7` or `.ie8` into their own stylesheet `styles-ie.css`.

By default, the matching rules are removed from `style.css`.

```js
grunt.initConfig({
  split_styles: {
    ie: {
      options: {
        pattern: /\.ie[6|7|8]/,
        output: 'style-ie.css'
      },
      files: {
        '<%= pkg.theme.path %>/style.css': '<%= pkg.theme.path %>/style.css'
      }
    },
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
