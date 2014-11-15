# grunt-translate

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-translate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-translate');
```

## The "translate" task

### Overview
In your project's Gruntfile, add a section named `translate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  translate: {
    options: {
       dir:'./translations', // directory where your translation files are located
       template:'en_en.json',  // the main template file which will be tracked and translated
       translateTo:['de_de','bg_bg'] // the rest of the maintained languages (may be present as files or not);
    },
  },
});
```

### Options

#### options.dir
Type: `String`
Default value: none;

A string value that is used to set the directory of the translateion json files.

#### options.template
Type: `String`
Default value: none

A string value that is used to point the main translation file from which the translation keys will be tracked.

#### options.translateTo
Type: `Array`
Default value: none

An array which contains the codes of the other translations. The string values could be whatever you want.
Those values will be converted to /dirPath/translateToValue.json, e.g. './translations/de_de.json'

### Usage Examples

```js
grunt.initConfig({
  translate: {
     options: {
        dir:'./translations/',
        template:'en_en.json',
        translateTo:['de_de','bg_bg']
      },
  },
});
```

## Release History
_(Nothing yet)_
