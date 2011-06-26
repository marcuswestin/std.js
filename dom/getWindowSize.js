// Thanks http://www.techiegyan.com/2008/07/10/get-window-size-using-javascript/!
module.exports = function(win) {
	win = win || window
	var doc = win.document,
		body = doc.body,
		docEl = doc.documentElement
	return {
		width: doc.compatMode=='CSS1Compat' && !win.opera ? docEl.clientWidth : body.clientWidth,
		height: doc.compatMode=='CSS1Compat' && !win.opera ? docEl.clientHeight : body.clientHeight
	}
}
