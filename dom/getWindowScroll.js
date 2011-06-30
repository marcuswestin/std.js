// Thanks http://stackoverflow.com/questions/1567327/using-jquery-to-get-elements-position-relative-to-viewport!
module.exports = function getWindowScroll(win) {
	var win = win || window,
		doc = win.document,
		docEl = doc.documentElement,
		body = doc.body
	
	return {
		top:  win.pageYOffset || (docEl && docEl.scrollTop) || body.scrollTop,
		left: win.pageXOffset || (docEl && docEl.scrollLeft) || body.scrollLeft
	}
}
