var isArray = require('./isArray')

module.exports = function pickOne(items, fn) {
	if (!items) { return null }
	var result
	if (isArray(items)) {
		for (var i=0; i<items.length; i++) {
			result = fn(items[i], i)
			if (result != null && result !== false) { return result }
		}
	} else {
		for (var key in items) {
			result = fn(items[key], key)
			if (result != null && result !== false) { return result }
		}
	}
	return null
}
