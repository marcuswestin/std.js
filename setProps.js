var each = require('./each')
var copy = require('./copy')

module.exports = function setProps(target, overwriteProps) {
	var result = copy(target)
	each(overwriteProps, function(val, key) {
		result[key] = overwriteProps[key]
	})
	return result
}
