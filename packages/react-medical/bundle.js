'use strict';

var components = require('components');



Object.keys(components).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return components[k]; }
	});
});
