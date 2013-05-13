module.exports = (function() {
	if (Array.isArray && Array.isArray.toString().match('\\[native code\\]')) {
		return function(obj) {
			return Array.isArray(obj)
		}
	} else if (Array.prototype) {
		return function(obj) {
			return (obj && obj.slice == Array.prototype.slice)
		}
	} else {
		// thanks @kangax http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
		return function(obj) {
			return Object.prototype.toString.call(obj) == '[object Array]'
		}
	}
})();
