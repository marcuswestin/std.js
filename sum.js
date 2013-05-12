var identity = require('std/identity')

module.exports = function sum(list, fn) {
	if (!list) { return 0 }
	if (!fn) { fn = identity }
	var total = 0
	each(list, function(val, key) {
		total += fn(val, key)
	})
	return total
}
