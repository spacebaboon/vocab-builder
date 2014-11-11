'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        express: {
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            protractor: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "protractor_conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true,
            },
            tasks: ['nodemon', 'karma', 'protractor', 'nodemon:dev:stop']
        }

    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('test', ['express:dev', 'karma', 'protractor']);
    grunt.registerTask('default', ['nodemon']);

};
