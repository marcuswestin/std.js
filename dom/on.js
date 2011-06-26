var unique = require('../unique'),
	curry = require('../curry'),
	client = require('../client'),
	getWindowScroll = require('./getWindowScroll')

module.exports = function on(element, eventName, handler) {
	var uniqueID = module.exports.stampElement(element),
		map = module.exports._elementMaps[uniqueID]
	if (!map) { map = module.exports._elementMaps[uniqueID] = {} }

	var eventListeners = map[eventName]
	if (!eventListeners) {
		eventListeners = map[eventName] = []
		eventListeners._realHandler = curry(module.exports._handleEvent, element, eventName)
		module.exports._addListener(element, eventName, eventListeners._realHandler)
	}
	eventListeners.push(handler)
}

module.exports._idNamespace = '__onID'
module.exports._elementMaps = {}

module.exports.stampElement = function(element) {
	var uniqueID
	if (element.getAttribute) {
		uniqueID = element.getAttribute(module.exports._idNamespace)
		if (!uniqueID) {
			uniqueID = unique()
			element.setAttribute(module.exports._idNamespace, uniqueID)
		}
	} else {
		uniqueID = element[module.exports._idNamespace]
		if (!uniqueID) {
			uniqueID = element[module.exports._idNamespace] = unique()
		}
	}
	return uniqueID
}

module.exports.getElementMap = function(element) {
	var uniqueID = element.getAttribute ? element.getAttribute(module.exports._idNamespace) : element[module.exports._idNamespace]
	return uniqueID && module.exports._elementMaps[uniqueID]
}

module.exports._addListener = function(element, eventName, handler) {
	if (window.addEventListener) {
		module.exports._addListener = function(element, eventName, handler) {
			if (eventName == 'mousewheel' && client.isFirefox) { eventName = 'MozMousePixelScroll' }
			element.addEventListener(eventName, handler, false)
		}
	} else if (window.attachEvent) {
		module.exports._addListener = function(element, eventName, handler) {
			element.attachEvent('on'+eventName, handler)
		}
	} else {
		module.exports._addListener = null
	}
	
	module.exports._addListener(element, eventName, handler)
}

module.exports._handleEvent = function(element, eventName, e) {
	var eventObj = module.exports._normalizeEvent(eventName, e),
		elementMap = module.exports.getElementMap(element),
		handlers = elementMap[eventName]
	for (var i=0; i<handlers.length; i++) {
		handlers[i](eventObj)
	}
}

module.exports._normalizeEvent = function(eventName, e) {
	e = e || event
	var eventObj = {
		keyCode: e.keyCode,
		metaKey: e.metaKey,
		target: e.target || e.srcElement
	}

	if (eventName == 'mousewheel') {
		// http://adomas.org/javascript-mouse-wheel/
		// https://developer.mozilla.org/en/Gecko-Specific_DOM_Events
		// TODO Normalize the values across browsers
		if (typeof e.wheelDeltaX == 'number') {
			eventObj.dx = -e.wheelDeltaX
			eventObj.dy = -e.wheelDeltaY
		} else if (e.wheelDelta) {
			eventObj.dy = -e.wheelDelta
		} else if (e.detail) {
			if (e.axis == e.HORIZONTAL_AXIS) { eventObj.dx = e.detail }
			if (e.axis == e.VERTICAL_AXIS) { eventObj.dy = e.detail }
		}
	}

	if (typeof e.pageX == 'number')   {
		eventObj.x = e.pageX
		eventObj.y = e.pageY
	} else if (typeof e.clientX == 'number') {
		var scroll = getWindowScroll(window)
		eventObj.x = e.clientX + scroll.left
		eventObj.y = e.clientY + scroll.top
	}

	eventObj.cancel = function() {
		if (e.preventDefault) { e.preventDefault() }
		else { e.returnValue = false }
	}

	if (e.type == 'keypress') {
		eventObj.charCode = (eventObj.charCode == 13 && eventObj.keyCode == 13) 
			? 0 // in Webkit, return/enter key gives a charCode as well as a keyCode. Should only be a keyCode
			: e.charCode
	}

	return e
}
