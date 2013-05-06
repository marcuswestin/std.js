module.exports = function throttle(delay, fn) {
	if (arguments.length == 1) {
		fn = delay
		delay = 50
	}
	var lastCallTime
	return function throttled() {
		if (lastCallTime && (new Date().getTime() - lastCallTime) < delay) { return }
		lastCallTime = new Date().getTime()
		fn.apply(this, arguments)
	}
}