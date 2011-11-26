var each = require('std/each')
module.exports = function proto(fn, properties) {
	var prototype = fn.prototype,
		F = function(args) { return fn.apply(this, args) }
	
	each(properties, function(prop, key) {
		prototype[key] = prop
	})
	
	F.prototype = prototype
	return function() {
		return new F(arguments)
	}
}
