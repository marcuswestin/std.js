var each = require('./each')
var copy = require('./copy')

module.exports = function addProps(target, moreProps) {
	if (!target) { return null }
	each(moreProps, function(val, key) {
		if (target[key] != null) { return }
		target[key] = val
	})
	return target
}