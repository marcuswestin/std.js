var each = require('./each')

module.exports = function(items, ctx, fn) {
	var result = []
	if (!fn) {
		fn = ctx
		ctx = this
	}
	each(items, ctx, function(item, key) {
		result.push(fn(item, key))
	})
	return result
}
