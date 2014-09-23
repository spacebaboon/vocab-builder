'use strict';

module.exports = function(grunt) {


//    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }

    });

    grunt.registerTask('test', [
       'karma'
    ]);

    grunt.registerTask('run', [

    ])
}