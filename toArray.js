var identity = require('./identity')
var each = require('./each')

module.exports = function toArray(obj, fn) {
	if (!fn) { fn = identity }
	var result = []
	each(obj, function(val, key) {
		result.push(fn(val, key))
	})
	return result
}