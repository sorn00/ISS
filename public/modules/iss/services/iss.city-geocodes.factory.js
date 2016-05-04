'use strict';

angular.module('iss').factory('cityGeoCodes',
	['$http',function($http){
	var getData = $http({
		method: 'GET',
		url: 'cityGeoCodes.json',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		} // send the data as json
	})
	.then(function (result) {
		return result.data;
	});
	return { getData: getData };
}]);
