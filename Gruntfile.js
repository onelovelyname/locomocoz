module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      dist: {
        src: [
          'bower_components/underscore/underscore-min.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/handlebars/handlebars.min.js',
          'bower_components/backbone/backbone-min.js',
          'bower_components/backbone.marionette/lib/backbone.marionette.min.js'
        ],
        dest: 'client/vendor.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('init', ['concat']);

};
