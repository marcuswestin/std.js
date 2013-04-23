var isArray = require('std/isArray')
var isArguments = require('std/isArguments')

module.exports = function isList(item) {
	return isArray(item) || isArguments(item)
}