var each = require('./each')

module.exports = function(items, ctx, fn) {
	var result = []
	each(items, ctx, function(item, key) {
		result.push(fn(item, key))
	})
	return result
}
