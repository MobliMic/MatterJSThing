module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: [
                    'resources/dev/sass/*.scss',
                    'resources/dev/js/*/*.js'
                ],
                tasks: ['default'],
                options: {
                    interrupt: true
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'resources/dev/js/game/*.js'],
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
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'resources/prod/css/main.css': ['resources/dev/sass/*.scss']
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'resources/prod/js/main.min.js': ['resources/dev/js/inc/matter-0.8.0.min.js', 'resources/dev/js/game/main.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('default', ['jshint', 'sass', 'uglify']);

};