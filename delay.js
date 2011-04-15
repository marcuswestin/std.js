module.exports = function(fn, delay) {
	if (typeof delay != 'number') { delay = 50 }
	var timeout
	return function() {
		if (timeout) { clearTimeout(timeout) }
		var args = arguments
		timeout = setTimeout(function() {
			fn.apply(this, args)
		}, delay)
	}
}

