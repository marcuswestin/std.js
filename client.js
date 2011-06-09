module.exports = {
  init: function() {
  	function isClient(name) {
  		var agent = window.navigator.userAgent,
  			index = agent.indexOf(name)
  		if (index < 0) { return false }
  		this.version = parseInt(agent.substr(index + name.length + 1))
  		return true
  	}
  	this.isIE = isClient('MSIE')
  	this.isFirefox = isClient('Firefox')
  	this.isWebKit = isClient('WebKit')
  	this.isChrome = isClient('Chrome')
  	this.isSafari = !this.isChrome && isClient('Safari')
  },
  
  isQuirksMode: function(doc) {
  	// in IE, if compatMode is undefined (early ie) or explicitly set to BackCompat, we're in quirks
  	return this.isIE && (!doc.compatMode || doc.compatMode == 'BackCompat')
  }
}

module.exports.init()
