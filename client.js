var Class = require('./Class')

var mobileRegex = /mobile/i;

var Client = Class(function() {
	
	this.init = function(userAgent) {
		this._userAgent = userAgent
		this._parseClient()
		this._parseOS()
	}
	
	this._parseClient = function() {
		(this.isChrome = this._isClient('Chrome'))
			|| (this.isFirefox = this._isClient('Firefox'))
			|| (this.isIE = this._isClient('MSIE'))
			|| (this.isSafari = this._isClient('Safari', 'Version'))
			|| (this.isOpera = this._isClient('Opera', 'Version'))
			|| (this.isSkyFire = this._isClient('Skyfire', 'Version')) // Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-us) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Safari/530.17 Skyfire/2.0
		
		this.isAndroid = this._isClient('Android', 'Version')
		
		if (this.isSafari) {
			(this.isIPhone = this._isClient('iPhone', 'Version'))
				|| (this.isIPad = this._isClient('iPad', 'Version'))
				|| (this.isIPod = this._isClient('iPod', 'Version'))
				|| (this.isAndroid = this._isClient('Android', 'Version'))
		}
		
		if (this.isOpera) {
			if (this._userAgent.match('Opera Mini')) { this.isOperaMini = true } // Opera mini is a cloud browser - Opera/9.80 (Android 2.3.4; Linux; Opera Mobi/ADR-1110171336; U; en) Presto/2.9.201 Version/11.50
			if (this._userAgent.match('Opera Mobi')) { this.isMobile = true } // Opera mobile is a proper mobile browser - Opera/9.80 (Android; Opera Mini/6.5.26571/ 26.1069; U; en) Presto/2.8.119 Version/10.54
		}
		
		if (this.isSkyFire) { this.isMobile = true }
		
		if (this.isIPhone) { this.isMobile = true }
		if (this.isAndroid) {
			if (this._userAgent.match(mobileRegex)) { this.isMobile = true }
			if (this.isFirefox) { this.isMobile = true } // Firefox Android browsers do not seem to have an indication that it's a phone vs a tablet: Mozilla/5.0 (Android; Linux armv7l; rv:7.0.1) Gecko/20110928 Firefox/7.0.1 Fennec/7.0.1
		}
		
		this.isTablet = this.isIPad || (this.isAndroid && !this.isMobile)
		try {
			document.createEvent("TouchEvent")
			this.isTouch = true
		} catch (e) {
			this.isTouch = false
		}
	}
	
	this._parseOS = function() {
		if (this.isSafari) {
			this.isIOS = (this.isIPhone || this.isIPad || this.isIPod)
			if (this.isIOS) { this.osVersion = parseFloat(this._userAgent.match(/ OS (\d+_\d+)/)[1].replace('_', '.'), 10) }
		}
		return this
	}
	
	this.isQuirksMode = function(doc) {
		// in IE, if compatMode is undefined (early ie) or explicitly set to BackCompat, we're in quirks
		return this.isIE && (!doc.compatMode || doc.compatMode == 'BackCompat')
	}
	
	this._isClient = function(name, versionString) {
		var agent = this._userAgent,
			index = agent.indexOf(name)
		if (index < 0) { return false }
		if (versionString) { index = agent.indexOf(versionString) }
		this.version = parseFloat(agent.substr(index + (versionString || name).length + 1))
		this.name = name
		return true
	}
	
})

if (typeof window != 'undefined') { module.exports = new Client(window.navigator.userAgent) }
else { module.exports = {} }

module.exports.parse = function(userAgent) { return new Client(userAgent) }
