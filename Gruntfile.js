/*** Created by anno on 2016/12/5. */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 配置uglify
        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        //         '<%= grunt.template.today("yyyy-mm-dd") %> */'
        //     },
        //     build: {
        //         expand: true,
        //         cwd: 'public/js',
        //         src: '**/*.js',
        //         dest: 'public/dest'
        //     }
        // },
        watch: {
            js: {
                files: [ 'public/**' ],
                // tasks: ['uglify'],
                options: {
                    livereload: true
                }
            },
            ejs: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
               options: {
                   file: 'app.js',
                   args: [],
                   ignoreFiles: ['readme', 'node_modules/', '.DS_store'],
                   wachedExtension: ['js'],
                   watchedFolder: ['./'],
                   debug: true,
                   delayTime: 1,
                   env: {
                       PORT: 3000,
                       NODE_ENV: 'default'
                   },
                   cwd: __dirname
               }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    // 便于开发不让警告和错误中断任务
    grunt.option('force', true);

    // 使用插件
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    //注册任务
    grunt.registerTask('default', ['concurrent'])
};