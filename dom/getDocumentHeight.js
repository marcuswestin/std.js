// From http://james.padolsey.com/javascript/get-document-height-cross-browser/
// "This function will return any document’s height. It’s been tested in IE6/7, FF2/3, Safari (Windows), Google Chrome and Opera 9.5. If the actual document’s body height is less than the viewport height then it will return the viewport height instead"
module.exports = function getDocumentHeight(doc) {
	var body = doc.body,
		docEl = doc.documentElement

	return Math.max(
		Math.max(body.scrollHeight, docEl.scrollHeight),
		Math.max(body.offsetHeight, docEl.offsetHeight),
		Math.max(body.clientHeight, docEl.clientHeight)
	)
}
