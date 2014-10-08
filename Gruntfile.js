/* jshint node: true */

module.exports = function (grunt) {

    'use strict';

    function readOptionalJSON( filepath ) {
        var data = {};
        try {
            data = grunt.file.readJSON( filepath );
        } catch ( e ) {}
        return data;
    }

    var gzip = require( "gzip-js" );

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: [
                    'web/vendor/jquery/dist/jquery.min.js',
                    'web/vendor/jquery-ui/ui/jquery-ui.js',
                    'web/vendor/bootstrap/dist/js/bootstrap.min.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/AdminLTE/app.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/twig.min.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/icheck.min.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/jquery.form.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/jquery.flot.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/jquery.flot.time.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/dashboard.js',
                    'vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/js/ydle.js'
                ],
                dest: 'web/js/app.min.js'
            },
            css: {
                src: [
                   "./web/css/vendor.css",
                   "vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/public/css/ydle.css"
                ],
                dest: 'web/css/style.min.css'

            }
        },

        watch: {
            js: {
                files: ['<%= concat.js.src %>'],
                tasks: ['concat']

            },
            css: {
                files: ['<%= concat.css.src %>'],
                tasks: ['concat']


            },
            tasks: ['concat']

        },
        less: {
            dev: {
                options: {
                    paths: ["web/css"],
                    cleancss: true

                },
                files: {
                    "./web/css/vendor.css": "./vendor/ydle/hub-bundle/Ydle/HubBundle/Resources/less/vendor.less"
                }
            }
        },
        jsonlint: {
            pkg: {
                src: [ "package.json" ]
            },

            bower: {
                src: [ "bower.json" ]
            }
        },
        jshint: {
            files: ['<%= concat.js.src %>'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        csslint: {
            files: ['<%= concat.css.src %>']
        }
    });

    // Charge tous les plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Dev : copy, compile, lance le serveur
    grunt.registerTask('dev', [
        'less',
        'concat',
        'jsonlint',
        //'jshint'
        //'watch'
    ]);

    // Prod : copy, compile, minify
    grunt.registerTask('production', [
        //'clean',
        'less',
        'concat'
    ]);

    grunt.registerTask('default', ['dev', 'concat']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

};
