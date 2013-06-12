module.exports = function after(durationInMs, fn) {
	if (typeof durationInMs != 'number') { throw new Error('after() expects a number') }
	return setTimeout(fn, durationInMs)
}

