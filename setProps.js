var each = require('./each')

module.exports = function setProps(target, overwriteProps) {
	if (!target) { return null }
	each(overwriteProps, function(val, key) {
		target[key] = overwriteProps[key]
	})
	return target
}
