var isList = require('./isList')
var setProps = require('./setProps')

module.exports = function copy(original, additionalProps) {
	var result = isList(original) ? [] : {}
	setProps(result, original)
	if (additionalProps) { setProps(result, additionalProps) }
	return result
}
