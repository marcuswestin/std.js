module.exports = function once(fn) {
	var fired = false
	return function() {
		if (fired) { return }
		fired = true
		fn.apply(this, arguments)
	}
}
