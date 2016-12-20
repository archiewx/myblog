/*** Created by anno on 2016/12/5. */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 配置uglify
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                expand: true,
                cwd: 'public/js',
                src: '**/*.js',
                dest: 'public/dest'
            }
        },
        watch: {
            build: {
                files: ['routes/*.js', 'public/**/*', 'app.js', 'views/*'],
                tasks: ['uglify'],
                options: { spawn: false }
            }
        }
    })

    // 使用插件
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-watch')
    //注册任务
    grunt.registerTask('default', ['uglify', 'watch'])
}