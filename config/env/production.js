'use strict';

module.exports = {

	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			stream: 'access.log'
		}
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'public/lib/angular-material/angular-material.css',
				'public/lib/angular-toastr/dist/angular-toastr.css',
			],
			cssExport: [
				'lib/bootstrap/dist/css/bootstrap.min.css',
				'lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'lib/angular-material/angular-material.css',
				'lib/font-awesome/css/font-awesome.min.css',
				'lib/angular-toastr/dist/angular-toastr.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-route/angular-route.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-toastr/dist/angular-toastr.tpls.js',
				'public/lib/angular-material/angular-material.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				//'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls-1.2.2.js',
				'public/lib/satellizer/satellizer.js',
				'public/lib/ngstorage/ngStorage.min.js',
				'public/lib/angular-toastr/dist/angular-toastr.js',
				'public/lib/angular-toastr/dist/angular-toastr.tpls.js',

			],
			jsExport: [
				'lib/jquery/dist/jquery.js',
				'lib/angular/angular.js',
				'lib/angular-messages/angular-messages.js',
				'lib/angular-mocks/angular-mocks.js',
				'lib/angular-route/angular-route.js',
				'lib/angular-resource/angular-resource.js',
				'lib/angular-cookies/angular-cookies.js',
				'lib/angular-aria/angular-aria.js',
				'lib/angular-animate/angular-animate.js',
				'lib/angular-toastr/dist/angular-toastr.js',
				'lib/angular-toastr/dist/angular-toastr.tpls.js',
				'lib/angular-material/angular-material.js',
				'lib/angular-ui-router/release/angular-ui-router.js',
				'lib/angular-ui-utils/ui-utils.js',
				'lib/angular-bootstrap/ui-bootstrap-tpls-1.2.2.js',
				'lib/satellizer/satellizer.js',
				'lib/ngstorage/ngStorage.min.js',
				'lib/angular-toastr/dist/angular-toastr.js',
				'lib/angular-toastr/dist/angular-toastr.tpls.js',
			]
		},
		css: 'public/dist/application.min.css',
		cssExport: 'dist/application.min.css',
		js: 'public/dist/application.min.js',
		jsExport: 'dist/application.js'

	},

	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
