'use strict';

angular.module('iss').controller('IssDisplayPassTimes', ['$scope', '$http','$log', 'issGetPassTimes', 'notifyFactory','contactDetails','cityGeoCodes',
	function($scope,$http,$log,issGetPassTimes,notifyFactory,contactDetails,cityGeoCodes) {

		$scope.$log = $log;

		$scope.contactDetailsObj = [{}];
		$scope.contactDetails = {};

		cityGeoCodes.getData.then(function(result) {
			$scope.cityGeoCodes = result.cityGeoCodes;

		})
		.catch(function(err){

			notifyFactory.error(err);

		});


		$scope.addContactDetails = function(){

			var nextContact = $scope.contactDetailsObj.length + 1;



			$scope.contactDetailsObj[nextContact] = {};
			$scope.contactDetailsObj[nextContact].firstName = $scope.contactDetails.firstName;
			$scope.contactDetailsObj[nextContact].lastName = $scope.contactDetails.lastName;
			$scope.contactDetailsObj[nextContact].cityGeoCode = $scope.contactDetails.cityGeoCode;


			$scope.isloading = true;

			var latlon = $scope.contactDetailsObj[nextContact].cityGeoCode.split(",");
			issGetPassTimes.getNextPassTime({lat:latlon[0],lon:latlon[1]})
				.$promise.then(function(nextPass) {

					$scope.isloading = false;

					$scope.contactDetailsObj[nextContact].riseTime = new Date(nextPass.response[0].risetime * 1000);
					$scope.contactDetailsObj[nextContact].duration = nextPass.response[0].duration;
					contactDetails.push($scope.contactDetailsObj[nextContact]);
					$scope.contactDetails = {};
					$scope.contactDetailsForm.$setPristine();
					$scope.contactDetailsForm.$setUntouched();

				})
				.catch(function(err){

					notifyFactory.error(err);


				});

		}


	}
]);


