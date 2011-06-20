// thanks @kangax http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
module.exports = function(obj) {
        if (Array.isArray) return Array.isArray(obj);
	return Object.prototype.toString.call(obj) == '[object Array]'
}
