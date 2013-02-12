module.exports = (function(global) {
	if (typeof process != 'undefined' && process.nextTick) { return process.nextTick }
	
	var requestAnimationFrame = global.requestAnimationFrame || global.mozRequestAnimationFrame || global.webkitRequestAnimationFrame || global.msRequestAnimationFrame
	if (requestAnimationFrame) { return makeTicker(requestAnimationFrame) }
	
	return makeTicker(setTimeout)
	
	function makeTicker(tickFn) {
		return function nextTick(callback) {
			tickFn(callback)
		}
	}
}(this))
