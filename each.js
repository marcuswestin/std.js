var isList = require('./isList')

module.exports = function each(items, fn) {
	if (!items) { return }
	if (items.forEach == Array.prototype.forEach) {
		items.forEach(fn)
	} else if (isList(items)) {
		for (var i=0; i < items.length; i++) {
			fn(items[i], i)
		}
	} else {
		for (var key in items) {
			if (!items.hasOwnProperty(key)) { continue }
			fn(items[key], key)
		}
	}
}
