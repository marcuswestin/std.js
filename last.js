var isList = require('./isList')
var keys = require('./keys')

module.exports = function(obj) {
	if (!obj) { return null }
	if (isList(obj)) {
		return obj[obj.length - 1]
	} else {
		return obj[last(keys(obj))]
	}
}
