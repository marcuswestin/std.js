var asyncEach = require('std/asyncEach')
var isList = require('std/isList')

module.exports = function asyncMap(items, opts) {
	var result = isList(items) ? [] : {}
	var includeNullValues = !opts.filterNulls
	var context = opts.context || this

	var originalIterate = asyncEach.makeIterator(context, opts.iterate)
	opts.iterate = function(value, indexOrKey, next) {
		originalIterate(value, indexOrKey, function(err, iterationResult) {
			if (err) { return next(err) }
			if (includeNullValues || (iterationResult != null)) {
				result[indexOrKey] = iterationResult
			}
			next()
		})
	}

	var originalFinish = opts.finish
	opts.finish = function(err) {
		if (err) { return originalFinish.call(context, err) }
		originalFinish.call(context, null, result)
	}

	asyncEach(items, opts)
}
