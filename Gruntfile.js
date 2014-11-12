'use strict';

module.exports = function (grunt) {

    grunt.initConfig({


        //concat: {
        //    dist: {
        //        src: ['public/scss/**/*.scss'],
        //        dest: 'public/scss/words.scss'
        //    }
        //},

        clean: {
          css: {
              src: ['public/css/**/*.css']
          }
        },

        sass: {
            dist: {
                //files: {
                //    'public/css/words.css':'public/scss/words.scss'
                //},
                files: [{
                    expand: true,
                    cwd: 'public/scss',
                    src: 'all.scss',
                    dest: 'public/css/',
                    ext: '.css'
                }],

                options: {
                    bundleExec: false, // runs the sass with "bundle exec sass" using Bundler (http://bundler.io/)
                    loadPath: ['public/scss', 'public/bower_components'],
                    style: 'compressed',
                    trace: true,
                    require: ['bourbon', 'neat']
                }
            }
        },

        watch: {
            css: {
                files: 'public/scss/**/*.scss',
                tasks: ['sass', 'csslint']
            },
            js: {
                files: 'public/scripts/**/*.js',
                tasks: ['jshint']
            }
        },

        jshint: {
            files: ['newShopStatic/_assets/js/modules/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        csslint: {
            base: {
                src: ['newShopStatic/_assets/css/**/*.css']
            },
            options: {
                csslintrc: '.csslintrc'
            }
        },

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
                logConcurrentOutput: true
            },
            tasks: ['watch', 'nodemon']
        }


    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('styles', ['clean', 'sass']);
    grunt.registerTask('build', ['styles', 'karma']);

    grunt.registerTask('test', ['express:dev', 'karma', 'protractor']);
    grunt.registerTask('default', ['build', 'concurrent']);

};
