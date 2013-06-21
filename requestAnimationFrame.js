var global = window
module.exports = (
	global.requestAnimationFrame
	|| global.mozRequestAnimationFrame
	|| global.webkitRequestAnimationFrame
	|| global.msRequestAnimationFrame
	|| function shimRequestAnimationFrame(fn) {
		setTimeout(fn, 1000/60)
	}
)
