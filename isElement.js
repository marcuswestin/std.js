module.exports = function isElement(node) {
	return !!(node && node.nodeType === 1)
}