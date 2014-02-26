# grunt-split-styles

> Split a CSS file based on selectors. Useful for building old IE stylesheets for example.

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
Type: `RegExp|Object`

If a RegExp is specified then selectors matching this regular expression will be added to the output file.

Alternatively you can specify an object:

```js
pattern: {
  match: /\.ie8/, // Required. See option.pattern.match below.
  matchParent: false // Optional. See options.pattern.matchParent below.
}
```

#### options.pattern.match
Type: `RegExp`

If a RegExp then selectors matching this regular expression will be added to the output file.

#### options.pattern.matchParent
Type: `Boolean`
Default: `false`

If `true` then a declaration's parent media node will be matched along with the declaration itself.

For example when matching a pattern such as `/^\.rtl/` against the following:

```css
@media screen and (min-width: 50em) {
    .rtl .thing {
        color: red;
    }

   .another .thing {
        color: blue;
    }
}
```

Yields:

```css
@media screen and (min-width: 50em) {
    .rtl .thing {
        color: red;
    }
}
```

#### options.output
Type: `String`

Optional new CSS file to copy the matching rulesets to.

#### options.remove
Type: `Boolean`
Default value: `true`

Whether or not to remove the matching rulesets from the original stylesheet.

#### options.mediaPattern
Type: `RegExp`

`@media` rulesets matching this regular expression will be copied into the new stylesheet

#### options.mediaPatternUnwrap
Type: `Boolean`
Default value: `false`

If `true`, only the child declarations of a matched `@media` rule will be extracted.

For example if your options are:

```js
options: {
  output: 'media-children.css',
  mediaPattern: /min-width: (\d+)em/,
  mediaPatternUnwrap: true
}
```

And you apply it to the following:

```css
@media screen and (min-width: 50em) {
    .rtl .thing {
        color: red;
    }

   .another .thing {
        color: blue;
    }
}
```

will extract:

```css
.rtl .thing {
    color: red;
}

.another .thing {
    color: blue;
}
```

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
    }
  }
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2014-02-26 v0.3.0
    * Made 'output' optional (default false). Props @spacedawwwg.
    * Fixed 'matchParent' option ignoring rules without parent. Props @spacedawwwg.

* 2014-02-25 v0.2.0
    * Add option to match parent nodes of declarations.
    * Add option to unwrap declarations of matched @media nodes.
    * Add some basic tests.

* 2014-02-16 v0.1.0 Initial Release.
