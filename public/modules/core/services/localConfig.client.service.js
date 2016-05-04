/**
 * Created by sorn on 12/4/15.
 */
'use strict';

//Config service used to retrieve local config settings
angular.module('core').factory('LocalConfig', [ '$http',
    function( $http) {

		return $http.get('../../env.json').then(
			function (response) {



				var config = response.data;
				console.log(config);

			}
		);

    }
]);




