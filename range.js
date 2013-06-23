module.exports = function range(start, stop, step) {
	if (arguments.length <= 1) {
		stop = start || 0
		start = 0
	}
	step = arguments[2] || 1
	
	var length = Math.max(Math.ceil((stop - start) / step), 0)
	var index = 0
	var result = []
	
	while (index < length) {
		result[index++] = start
		start += step
	}
	
	return result
}
