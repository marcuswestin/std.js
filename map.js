var each = require('./each')
var isList = require('./isList')
var isArray = require('./isArray')

module.exports = function map(obj, fn) {
	if (isArray(obj) && obj.map) { return obj.map(fn) }
	var result = isList(obj) ? new Array(obj.length) : {}
	each(obj, function(val, key) {
		result[key] = fn(val, key)
	})
	return result
}
