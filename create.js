var each = require('./each')
// Thanks Douglas Crockford! http://javascript.crockford.com/prototypal.html
module.exports = function create(obj, extendWithProperties) {
	function extendObject(result, props) {
		each(props, function(val, key) {
			result[key] = val
		})
		return result
	}
	if (typeof Object.create == 'function') {
		module.exports = function nativeCreate(obj, extendWithProperties) {
			return extendObject(Object.create(obj), extendWithProperties)
		}
	} else {
		module.exports = function shimCreate(obj, extendWithProperties) {
			function F() {}
			F.prototype = obj
			return extendObject(new F(), extendWithProperties)
		}
	}
	return module.exports(obj, extendWithProperties)
}
