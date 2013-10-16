/*!
 * Project Gruntfile
 */

'use strict';

module.exports = function( grunt ) {


    var appConfig = {
        dirs: {
            js:   "../javascripts",
            less: "../stylesheets/less",
            css:  "../stylesheets",
            img:  "../images"
        },
        // Metadata
        pkg: grunt.file.readJSON("package.json"),
        banner :'/*  \n '+
                '*   Project: <%= pkg.name %> - version <%= pkg.version %> \n '+
                '*   Description: <%= pkg.description %> \n '+
                '*   Repository: <%= pkg.repository %> \n '+
                '*   Author: <%= pkg.author.name %> \n '+
                '*   Github: <%= pkg.author.github %> \n '+
                '*   Start in: <%= pkg.startin %> \n '+
                '*   Last Update: <%= grunt.template.today("dd/mm/yyyy") %> \n '+
                '*/ \n',

        // Projects variables
        // Config task here
        // Watch task
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: [
                    "<%= dirs.js %>/**/*.js",
                    "!<%= dirs.js %>/lib/*.js"
                ],
                tasks: ["uglify", "jshint"]
            },
            less: {
                files:  [
                    '<%= dirs.less %>/**/*.less',
                    '<%= dirs.less %>/*.less'
                ],
                tasks: "less"
            },
            html: {
                files: "/*.html"
            }
        },
        // Less compile task
        less: {
            site: {
                files: {
                    '<%= dirs.css %>/style.css': '<%= dirs.less %>/imports.less'
                },
                options: {
                    //yuicompress: true
                }
            }
        },
        // livereload task
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: ".",
                    hostname: "localhost",
                    livereload: true,
                    open: true
                }
            }
        },

        // jshint task
        jshint: {
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                },
                bitwise: true,
                expr: true
            }
        },
        // uglify task
        uglify: {
            options: {
                banner: "<%= banner %>",
                mangle: false
            },
            dist: {
                files: {
                    "<%= dirs.js %>/site.min.js": [
                    "<%= dirs.js %>/custom/*.js"
                    ],
                    "<%= dirs.js %>/plugins.min.js": [
                    "<%= dirs.js %>/plugins/*.js"
                    ]
                }
            }
        }
    };

    grunt.initConfig(appConfig);

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register custom task
    //grunt.registerTask( "default", [ "connect", "watch" ]);
    grunt.registerTask( 'dev', [ 'tarefa' ] );
    grunt.registerTask( 'build', [ 'tarefa' ] );
    grunt.registerTask('default', ['less', 'jshint', 'uglify', 'watch', 'connect']);

};