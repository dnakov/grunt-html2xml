/*
 * grunt-html2xml
 * https://github.com/dnakov/grunt-html2xml
 *
 * Copyright (c) 2014 dnakov
 * Licensed under the MIT license.
 */

'use strict';

var cheerio = require('cheerio');

module.exports = function(grunt) {

  grunt.registerMultiTask('dom_munger', 'Read and manipulate html.', function() {

    var options = this.options({});
    var done = this.async();

    if (this.filesSrc.length > 1 && this.data.dest){
      grunt.log.error('Dest cannot be specified with multiple src files.');
      done(false);      
    }

    this.files.forEach(function(f) {

      var dest = f.dest;

      f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(f){

        var srcContents = grunt.file.read(f);

        var $ = cheerio.load(srcContents,{lowerCaseAttributeNames:false, xmlMode:true});
        grunt.file.write(dest || f,$.xml());

      });
    });

    done();
  });

};
