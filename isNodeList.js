module.exports = (function() {
	if (typeof NodeList == 'undefined') {
		return function isNodeList() {
			return false
		}
	} else {
		return function isNodeList(obj) {
			return obj && obj.item == NodeList.prototype.item
		}
	}
}())