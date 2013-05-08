var each = require('./each')
var copy = require('./copy')

module.exports = function addProps(target, addPropsIfNotExist) {
	var result = copy(target)
	each(addPropsIfNotExist, function(val, key) {
		if (result[key] == undefined) {
			result[key] = addPropsIfNotExist[key]
		}
	})
	return result
}
