/*
 * grunt-translate
 * https://github.com/emonidi/grunt-translate
 *
 * Copyright (c) 2014 Emiliyan Gospodinov
 * Licensed under the MIT license.
 */
'use strict';
var XHR = require('xhrequest');
var _ = require('lodash');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('translate', 'The best Grunt plugin ever.', function() {
    this.async();
    var API_KEY = 'trnsl.1.1.20141115T172010Z.1375530d658f437d.3151fbe8cdd84a8f465c87479765e29f0402758c';
    var self = this;
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    var templateSrc = options.template;
    var dir = options.dir;
    var targetLangs = [];
    var langCodes = [];
    var mainLangCode = '';
    this.template;

    this.setTargetLangs = function(){
         if (typeof options.translateTo === "object") {
              for(var i in options.translateTo){
                 if (options.translateTo[i].main !== true) {
                    targetLangs.push(options.translateTo[i]['file']);
                    langCodes.push(options.translateTo[i]['langCode']);
                 } else {
                    mainLangCode = options.translateTo[i]['langCode'];
                 }
              }
         }
    }

    //gets the file content of the template
    this.getTemplate = function() {
       this.template = JSON.parse(grunt.file.read(dir+templateSrc));
    }

    //checks if target lang files exist
    this.targetLangFileExists = function(targetLang) {
        return grunt.file.exists(dir + targetLang + '.json');
    }

    //creates/updates the target language file
    this.createTargetLangFile = function(targetLang,string) {
        grunt.file.write(dir+targetLang+'.json', string);
    }
    //gets the last key from the object for translation
    //need it to get the time when the last key has been translated from the api
    this.getLastKey = function(template) {
        var lastKey;
        for (var i in template) {
            if (i !== undefined) {
               lastKey = i;
            }
        }
        return lastKey;
    }

    //creates a json string which will be written in the translated file 
    this.createJSONString = function(template,langCode,callback,prefix){
        var lastKey = this.getLastKey(template);

        var prefix = !prefix ? '' : prefix,
            array = [];
        array.push("{ \n");
        _.forEach(template,function(item,i){
           self.translate(item,langCode,function(e){
              array.push('\t"' + i + '"' + ' : ' + '"'+ e + '",' + '\n');
              if(i === lastKey){
                array[array.length-1] = array[array.length-1].split(",")[0]
                array.push('\n}')
                var string = array.join('');
                callback(string);    
              }
           });
        });
    }

    //gets the content of the file which will accomodate the translation
    this.getTargetLangContent = function(targetLang){
        var string = grunt.file.read(dir + targetLang + '.json');
        return JSON.parse(string);
    }

    //calls an api and translates accepts callback
    this.translate = function(string,targetLangCode,callback){

         XHR('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+
            API_KEY+'&lang='+mainLangCode+'-'+targetLangCode+'&text='+string, {
            success: function(responseData) {
              var responseObj = JSON.parse(responseData.toString());
              callback(responseObj.text);
            },
            error: function (err) {
              console.log(err.toString());
            }
        });

        // XHR('http://mymemory.translated.net/api/get?q='+string+'&langpair='+mainLangCode + '|' + targetLangCode, {
        //     success: function(responseData) {
        //       var responseObj = JSON.parse(responseData.toString());
        //       console.log(responseObj.responseData.translatedText);
        //       return responseObj.responseData.translatedText;
        //     },
        //     error: function(err){
        //       console.log(err);
        //       this.async()
        //     }
        // });
    }
  
    this.setTargetLangs();
    this.getTemplate();  

    targetLangs.forEach(function(targetLang,index){
        var template = self.template;
        var targetLangContent = {};
        for (var i in template) {
          targetLangContent[i] = template[i];
        }
        self.createJSONString(targetLangContent, langCodes[index],function(e){
          self.createTargetLangFile(targetLang,e);
        });
      });
    });
};

