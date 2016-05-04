'use strict';

//Patient service used to communicate Patient REST endpoints
angular.module('iss').factory('issGetPassTimes', ['$resource','configService',
	function($resource,configService) {

		return $resource(configService.issPassTimesApi + 'n=1',{lat : '@lat',lon :'@lon',callback : 'JSON_CALLBACK'},
		{

			getNextPassTime: {
				method: "JSONP"

				//url: configService.issPassTimesApi + 'n=1&lat=:LAT&lon=:LON:callback=?',

			}
			/*,
			update: {
				method: 'PUT',
				url: configService.api + 'patient/:patientId/careplan/:dosePlanId'
			},*/

		});


	}
]);




/*

http://api.open-notify.org/iss-pass.json?lat=-80.0&lon=45.0&alt=20&n=5&callback=?
	http://api.open-notify.org/iss-pass.json?lat=-80.0&lon=-112.3&alt=20&n=5&callback=?
*/

