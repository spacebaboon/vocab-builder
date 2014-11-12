'use strict';

module.exports = function(grunt) {

    grunt.initConfig({


        sass: {
            main: {
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
                files: ['public/scss/**/*.scss'],
                tasks: ['sass', 'csslint', 'legacssy:ie8']
            }
//            js: {
//                files: ['public/js/**/*.js'],
//                tasks: ['jshint']
//            }
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
                logConcurrentOutput: true,
            },
            tasks: ['watch', 'nodemon']
        }


    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('build', ['sass', 'karma']);

    grunt.registerTask('test', ['express:dev', 'karma', 'protractor']);

    grunt.registerTask('default', ['development', 'concurrent']);

    grunt.registerTask('default', ['nodemon']);

};
