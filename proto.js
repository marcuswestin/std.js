module.exports = function proto(fn, properties) {
	function F(args) {
		return fn.apply(this, args)
	}
	F.prototype = properties
	return function() {
		return new F(arguments)
	}
}
