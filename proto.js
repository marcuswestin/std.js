var each = require('std/each')
module.exports = function proto(fn, properties) {
	var prototype = fn.prototype
	each(properties, function(prop, name) {
		prototype[name] = prop
	})
	return fn
}