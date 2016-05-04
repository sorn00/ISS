'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

angular.module(ApplicationConfiguration.applicationModuleName).config(function($mdThemingProvider, $mdIconProvider){
	// TODO: add configurations here
	$mdThemingProvider.theme('default')
		.primaryPalette('light-blue', {

		})
})

angular.module(ApplicationConfiguration.applicationModuleName).provider('configService', function(){
	var options = {};
	this.config = function(opt){
		angular.extend(options,opt);
	};
	this.$get = [function() {
		if(!options){
			throw new Error('config options must be configured');
		}
		return options;

	}]
})

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	$.get('env.json', function (configData) {

		angular.module(ApplicationConfiguration.applicationModuleName).config(['$httpProvider', '$authProvider','configServiceProvider',function ($httpProvider,$authProvider,configServiceProvider) {
			configServiceProvider.config(configData);

			

		}]);

		//Init the app
		angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
	});



});





angular.module(ApplicationConfiguration.applicationModuleName).run(function($http) {


	$http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
	$http.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';



});


