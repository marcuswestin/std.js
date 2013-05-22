module.exports = (function() {
	if (Object.keys) {
		return Object.keys
	} else {
		return function(obj) {
			var keys = []
			for (var k in obj) {
				if (obj.hasOwnProperty(k)) { keys.push(k) }
			}
			return keys
		}
	}
}())
