module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            dist : {
                src: [
                    "public/javascript/libs/*.js",
                    "public/javascript/head.js",
                    "public/javascript/Function.js",
                    "public/javascript/Calculus.js",
                    "public/javascript/Unit.js",
                    "public/javascript/App.js",
                    "public/javascript/tail.js"

                ],
                dest: "public/javascript/build/production.js"
            }
        },
        uglify: {
            build: {
                src: "public/javascript/build/production.js",
                dest: "public/javascript/build/production.min.js"
            }
        },
        watch: {
            scripts: {
                files: ["public/javascript/*.js"],
                tasks: ["concat", "uglify"],
                options: {
                    spawn: false
                }
            },
            css: {
                files: "public/css/*.sass",
                task: ["sass"],
                options: {
                    spawn: false
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: "expanded"
                },
                files: {
                    "public/css/build/production.css": "public/css/main.sass"
                }
            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    //grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-sass");

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask("default", ["concat", "uglify", "sass"]);

};
