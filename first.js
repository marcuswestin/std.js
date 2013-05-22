var isList = require('./isList')
var keys = require('./keys')

module.exports = function first(obj) {
	if (!obj) { return null }
	if (isList(obj)) {
		return obj[0]
	} else {
		return obj[keys(obj)[0]]
	}
}