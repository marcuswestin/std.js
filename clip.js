module.exports = function clip(val, min, max) {
	return Math.max(Math.min(val, max || val), min || 0)
}
