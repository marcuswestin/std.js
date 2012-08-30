module.exports = function find(items, fn) {
	if (!items) { return }
	for (var i=0; i<items.length; i++) {
		if (fn(items[i])) { return items[i] }
	}
}