var each = require('./each')
var isList = require('./isList')
var isObject = require('./isObject')

module.exports = function deepCopy(obj) {
	var result = isList(obj) ? [] : {}
	each(obj, function(val, key) {
		result[key] = ((isList(val) || isObject(val)) ? deepCopy(val) : val)
	})
	return result
}
