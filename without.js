var each = require('std/each')

module.exports = function without(obj, prop) {
	var res = {}
	each(obj, function(val, key) {
		if (key == prop) { return }
		res[key] = val
	})
	return res
}