var range = require('./range')
var each = require('./each')
var identity = require('./identity')

module.exports = function(obj, iteratorFn) {
	if (typeof obj == 'number') {
		obj = range(obj)
	}
	if (!iteratorFn) { iteratorFn = identity }
	var result = []
	each(obj, function(value, key) {
		result.push(iteratorFn(value, key))
	})
	return result
}
