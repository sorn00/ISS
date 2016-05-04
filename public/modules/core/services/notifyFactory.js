/**
 * Created by nm19773 on 11/5/15.
 */
'use strict';
angular.module('core').factory('notifyFactory', function(toastr) {
	var notify;

	toastr.options = {
		"closeButton": true,
		"positionClass": "toast-top-right",
		"timeOut": "3500"
	};

	notify = function(message, type) {
		return toastr[type](message);
	};

	return {
		success: function(message) {
			notify(message, 'success');
		},
		error: function(message) {
			notify(message, 'error');
		}
	};
});
