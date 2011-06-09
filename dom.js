var dom = module.exports

// From http://james.padolsey.com/javascript/get-document-height-cross-browser/
// "This function will return any document’s height. It’s been tested in IE6/7, FF2/3, Safari (Windows), Google Chrome and Opera 9.5. If the actual document’s body height is less than the viewport height then it will return the viewport height instead"
dom.getDocumentHeight = function(doc) {
  var body = doc.body,
    docEl = doc.documentElement
  
  return Math.max(
    Math.max(body.scrollHeight, docEl.scrollHeight),
    Math.max(body.offsetHeight, docEl.offsetHeight),
    Math.max(body.clientHeight, docEl.clientHeight)
  )
}

// Thanks http://stackoverflow.com/questions/1567327/using-jquery-to-get-elements-position-relative-to-viewport!
dom.getPageScroll = function(win) {
	var win = win || window,
		doc = win.document,
		docEl = doc.documentElement,
		body = doc.body
	
	return {
		top:  win.pageYOffset || (docEl && docEl.scrollTop) || body.scrollTop,
		left: win.pageXOffset || (docEl && docEl.scrollLeft) || body.scrollLeft
	}
}

// dom offset code adopted from jQuery JavaScript Library v1.3.2
/*!
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
dom.getOffset = function(elem, win) {
	win = win || window;

	if (elem.getBoundingClientRect) {
		var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement,
			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scroll = dom.getPageScroll(win),
			top  = box.top  + scroll.y - clientTop,
			left = box.left + scroll.x - clientLeft;
		return { y: top, x: left, w: box.right - box.left, h: box.bottom - box.top };

	} else {
		var offset = arguments.callee.offset;
		if (!offset) {
			var body = document.body, container = document.createElement('div'), innerDiv, checkDiv, table, td, rules, prop, bodyMarginTop = body.style.marginTop,
				html = '<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';

			rules = { position: 'absolute', top: 0, left: 0, margin: 0, border: 0, width: '1px', height: '1px', visibility: 'hidden' };
			for (prop in rules) container.style[prop] = rules[prop];

			container.innerHTML = html;
			body.insertBefore(container, body.firstChild);
			innerDiv = container.firstChild, checkDiv = innerDiv.firstChild, td = innerDiv.nextSibling.firstChild.firstChild;

			var offset = {};
			offset.doesNotAddBorder = (checkDiv.offsetTop !== 5);
			offset.doesAddBorderForTableAndCells = (td.offsetTop === 5);

			innerDiv.style.overflow = 'hidden', innerDiv.style.position = 'relative';
			offset.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

			body.style.marginTop = '1px';
			offset.doesNotIncludeMarginInBodyOffset = (body.offsetTop === 0);
			body.style.marginTop = bodyMarginTop;

			body.removeChild(container);
			arguments.callee.offset = offset;
		}

		var height = elem.offsetHeight;
		var width = elem.offsetWidth;

		var offsetParent = elem.offsetParent, prevOffsetParent = elem,
			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
			body = doc.body, defaultView = doc.defaultView,
			prevComputedStyle = defaultView.getComputedStyle(elem, null),
			top = elem.offsetTop, left = elem.offsetLeft;

		while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
			computedStyle = defaultView.getComputedStyle(elem, null);
			top -= elem.scrollTop, left -= elem.scrollLeft;
			if (elem === offsetParent) {
				top += elem.offsetTop, left += elem.offsetLeft;
				if (offset.doesNotAddBorder && !(offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.tagName))) {
					top += parseInt(computedStyle.borderTopWidth, 10) || 0;
					left += parseInt(computedStyle.borderLeftWidth, 10) || 0;
				}
				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}
			if (offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
				top += parseInt(computedStyle.borderTopWidth, 10) || 0;
				left += parseInt(computedStyle.borderLeftWidth, 10) || 0;
			}
			prevComputedStyle = computedStyle;
		}

		if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
			top += body.offsetTop;
			left += body.offsetLeft;
		}

		if (prevComputedStyle.position === "fixed") {
			top  += Math.max(docElem.scrollTop, body.scrollTop);
			left += Math.max(docElem.scrollLeft, body.scrollLeft);
		}

		return { y: top, x: left, w: width, h: height };
	}
}
// end jQuery positioning code