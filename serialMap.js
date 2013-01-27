var serialEach = require('std/serialEach')

module.exports = function serialMap(items, opts) {
	var result = []
	var includeNullValues = !opts.filterNulls
	var context = opts.context || this

	var originalIterate = serialEach.makeIterator(context, opts.iterate)
	opts.iterate = function(value, index, next) {
		originalIterate(value, index, function(err, iterationResult) {
			if (err) { return next(err) }
			if (includeNullValues || (iterationResult != null)) {
				result.push(iterationResult)
			}
			next()
		})
	}

	var originalFinish = opts.finish
	opts.finish = function(err) {
		if (err) { return originalFinish.call(context, err) }
		originalFinish.call(context, null, result)
	}

	serialEach(items, opts)
}
