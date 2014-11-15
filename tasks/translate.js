/*
 * grunt-translate
 * https://github.com/emonidi/grunt-translate
 *
 * Copyright (c) 2014 Emiliyan Gospodinov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('translate', 'The best Grunt plugin ever.', function() {
    var self = this;
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    var templateSrc = options.template;
    var dir = options.dir;
    var targetLangs = options.translateTo;
    this.template;
    //gets the file content of the template
    this.getTemplate = function(){
       this.template = JSON.parse(grunt.file.read(dir+templateSrc));
    }

    //checks if target lang files exist
    this.targetLangFileExists = function(targetLang){
        return grunt.file.exists(dir + targetLang + '.json');
    }

    this.createTargetLangFile = function(targetLang,string){
        grunt.file.write(dir+targetLang+'.json', string);
    }

    this.createJSONString = function(template,prefix){
        var prefix = !prefix ? '' : prefix;
        var array = [];
        array.push("{ \n");
        for(var i in self.template){
          array.push('\t"' + i + '"' + ' : ' + '"'+ prefix + self.template[i] + '",' + '\n');
                                              
        }
        array[array.length-1] = array[array.length-1].split(",")[0]
        array.push('\n}')
        var string = array.join('');
        return string;
    }

    this.getTargetLangContent = function(targetLang){
        var string = grunt.file.read(dir + targetLang + '.json');
        return JSON.parse(string);
    }


    this.getTemplate();

    targetLangs.forEach(function(targetLang){
        if (!self.targetLangFileExists(targetLang)) {
            var string = self.createJSONString(self.template,targetLang+" ");
        } else {
            var template = self.template;
            var targetLangContent = self.getTargetLangContent(targetLang);
            for (var i in template) {
               if (!targetLangContent[i]) {
                  targetLangContent[i] = template[i];
               }
            }
            var string = self.createJSONString(targetLangContent,targetLang+" ");
        }

        self.createTargetLangFile(targetLang,string);
    });

  });
};

