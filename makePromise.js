var each = require('std/each')

module.exports = function makePromise() {
	var dependants = []
	var fulfillmentArgs = null
	
	return {
		depend:depend,
		fulfill:fulfill
	}
	
	function depend(fn) {
		if (fulfillmentArgs) { return fn.apply(this, fulfillmentArgs) }
		dependants.push(fn)
	}
	
	function fulfill() {
		fulfillmentArgs = slice(arguments, 0)
		each(dependants, function(fn) {
			fn.apply(this, fulfillmentArgs)
		})
	}
}
