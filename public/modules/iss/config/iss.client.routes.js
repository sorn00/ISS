'use strict';

//Setting up route
angular.module('iss').config(['$stateProvider',
	function($stateProvider) {
		// Patients state routing
		$stateProvider.
		state('view', {
			url: '/contacts',
			templateUrl: 'modules/iss/views/list-contacts.client.view.html'
		});
	}
]);
