module.exports = function after(durationInMs, fn) {
	return setTimeout(fn, durationInMs)
}

