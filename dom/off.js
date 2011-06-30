var on = require('./on')

module.exports = function(element, eventName, handler) {
	var map = on.getElementMap(element),
		handlers = map[eventName]
	if (handler) {
		for (var i=0; i<handlers.length; i++) {
			if (handler != handlers[i]) { continue }
			handlers.splice(i, 1)
			break
		}
	}
	if (!handler || !handlers.length) {
		module.exports._removeHandler(handlers._realHandler)
		delete map[eventName]
	}
}

module.exports._removeHandler = function(element, eventName, handler) {
	if (window.removeEventListener) {
		module.exports._removeHandler = function(element, eventName, handler) {
			if (eventName == 'mousewheel' && client.isFirefox) { eventName = 'MozMousePixelScroll' }
			element.removeEventListener(eventName, handler, false)
		}
	} else if (window.detachEvent) {
		module.exports._removeHandler = function(element, eventName, handler) {
			element.detachEvent('on'+eventName, handler)
		}
	} else {
		module.exports._removeHandler = null
	}

	module.exports._removeHandler(element, eventName, handler)
}
