module.exports = function pickOne(items, fn) {
	if (!items) { return null }
	var result
	for (var i=0; i<items.length; i++) {
		result = fn(items[i], i)
		if (result != null) { return result }
	}
	return null
}
