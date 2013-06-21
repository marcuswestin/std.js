module.exports = function isFragment(node) {
	return !!(node && node.nodeType === 11)
}