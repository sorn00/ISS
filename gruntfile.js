'use strict';

var fs = require('fs');

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js', '!app/tests/'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/config.js', 'public/application.js',  'public/modules/core/*.js', 'public/modules/core/**/*.js', 'public/modules/iss/*.js', 'public/modules/iss/**/*.js'],
		clientCSS: ['public/modules/**/*.css'],
		/*clientSCSS: ['public/modules/!**!/!*.scss'],*/
		mochaTests: ['app/tests/**/*.js']
	};


	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},

			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			/*clientSCSS: {
				files: watchFiles.clientSCSS,
				tasks: ['sass'],
				options: {
					livereload: true
				}
			},*/
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			},
			mochaTests: {
				files: watchFiles.mochaTests,
				tasks: ['test:server'],
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true



				}
			}
		},
/*		sass:{
			dist:{
				options: {                       // Target options
					lineNumbers: true,
					sourcemap: 'inline',
				},
				files:{
					'public/modules/core/css/main.css' : 'public/modules/core/css/core.scss'
				}
			}
		},*/
		/*concat: {
			options: {
				// define a string to put between each file in the concatenated output
				//separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['public/config.js','public/application.js','public/modules/!**!/!*.js', 'public/modules/!**!/!*.js', '!public/modules/!**!/tests/!**'],
				// the location of the resulting JS file
				dest: 'public/dist/application.js'
			}
		},*/
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		uglify: {
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/application.min.css': watchFiles.clientCSS
					//This will work once modules are installed on build server currently all changes forced be migrated no cherry picking
					//'public/modules/core/css/main.css'
				}
			}
		},
		swig: {
			development: {
				init: {
					autoescape: true
				},
				dest: './public/dist',
				src: ['app/views/**/*.swig'],
				generateSitemap: false,
				generateRobotstxt: false,
				cssFiles:'<%= applicationSwigCss %>',
				jsFiles: '<%= applicationSwigJs  %>',
				siteUrl: '',
				production: true,
				robots_directive: 'Disallow /'
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		ngAnnotate: {
			production: {
				files: {
					'public/dist/application.js': watchFiles.clientJS
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			},
			secure: {
				NODE_ENV: 'secure'
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		copy: {
		    localConfig: {
	            src: 'config/env/local.example.js',
	            dest: 'config/env/local.js',
	            filter: function() {
	            	return !fs.existsSync('config/env/local.js');
	            }
		    },
		dist: {
			src: 'public/dist/views/index.server.view.html',
			dest: 'public/index.html',
			filter: function() {
				return !fs.existsSync('public/index.html');
			}
		}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('grunt-contrib-concat');
	/*grunt.loadNpmTasks('grunt-contrib-sass');*/

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);

		var swigCss = [];
		var swigJs = [];

		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);

		console.log('****************************************************');
		console.log(config.assets.js);
		console.log('******************************************************');


		for (var j = 0; j < config.assets.lib.jsExport.length; j++) {
			swigJs.push(config.assets.lib.jsExport[j]);

		}

		swigJs.push(config.assets.jsExport);

		for (var x = 0; x < config.assets.lib.cssExport.length; x++) {
			swigCss.push(config.assets.lib.cssExport[x]);

		}

		swigCss.push(config.assets.cssExport);

		grunt.config.set('applicationSwigJs', swigJs);
		grunt.config.set('applicationSwigCss', swigCss);

	});

	// Default task(s).
	grunt.registerTask('default', [/*'lint', */'copy:localConfig', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'copy:localConfig', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'copy:localConfig', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'csslint']);

	// Build task(s).
	grunt.registerTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin','swig','copy:dist']);


	// Test task.
	grunt.registerTask('test', ['copy:localConfig', 'test:server', 'test:client']);
	grunt.registerTask('test:server', ['env:test', 'mochaTest']);
	grunt.registerTask('test:client', ['env:test', 'karma:unit']);
};
//'concat',
