var each = require('std/each')

module.exports = function inverse(obj) {
	var result = {}
	each(obj, function(val, key) {
		if (result[val] !== undefined) { throw new Error("Duplicate value") }
		result[val] = key
	})
	return result
}
