var isArray = require('./isArray')

module.exports = function find(items, fn) {
	if (!items) { return null }
	if (isArray(items)) {
		for (var i=0; i<items.length; i++) {
			if (fn(items[i], i)) { return items[i] }
		}
	} else {
		for (var key in items) {
			if (fn(items[key], key)) { return items[key] }
		}		
	}
	return null
}