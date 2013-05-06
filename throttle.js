module.exports = function throttle(delay, fn) {
	if (arguments.length == 1) {
		fn = delay
		delay = 0
	}
	var throttleTimeout
	return function throttled() {
		if (throttleTimeout) { return }
		throttleTimeout = setTimeout(function() { throttleTimeout = null }, delay)
		fn.apply(this, arguments)
	}
}