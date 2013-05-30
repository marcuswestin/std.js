var each = require('std/each')

module.exports = function makePromise() {
	var dependants = []
	var result
	
	return result = {
		depend:depend,
		fulfill:fulfill
	}
	
	function depend(fn) {
		if (result.fulfillment) { return fn.apply(this, result.fulfillment) }
		dependants.push(fn)
	}
	
	function fulfill() {
		result.fulfillment = slice(arguments, 0)
		each(dependants, function(fn) {
			fn.apply(this, result.fulfillment)
		})
	}
}
