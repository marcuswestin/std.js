var isList = require('./isList')

module.exports = function each(items, fn) {
	if (!items) { return }
	if (isList(items)) {
		if (items.forEach) {
			items.forEach(fn)
		} else {
			for (var i=0; i < items.length; i++) {
				fn(items[i], i)
			}
		}
	} else {
		for (var key in items) {
			if (!items.hasOwnProperty(key)) { continue }
			fn(items[key], key)
		}
	}
}
