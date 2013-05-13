var isArray = require('std/isArray')
var isArguments = require('std/isArguments')
var isNodeList = require('std/isNodeList')

module.exports = function isList(item) {
	return isArray(item) || isArguments(item) || isNodeList(item)
}
