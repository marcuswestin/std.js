var each = require('./each')
var isList = require('./isList')
var isArray = require('./isArray')

module.exports = function map(obj, fn) {
	if (!obj) { return null }
	if (obj.map == Array.prototype.map) { return obj.map(fn) }
	
	var result = isList(obj) ? [] : {}
	each(obj, function(val, key) {
		result[key] = fn(val, key)
	})
	return result
}
