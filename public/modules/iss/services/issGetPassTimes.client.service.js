'use strict';

//Pass time service used to communicate ISS  endpoints returns next pass time 
angular.module('iss').factory('issGetPassTimes', ['$resource','configService',
	function($resource,configService) {

		return $resource(configService.issPassTimesApi + 'n=1',{lat : '@lat',lon :'@lon',callback : 'JSON_CALLBACK'},
		{

			getNextPassTime: {
				method: "JSONP"


			}


		});


	}
]);


