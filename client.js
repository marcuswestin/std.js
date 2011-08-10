module.exports = {
	init: function() {
		var client = this
		function isClient(name, versionString) {
			var agent = window.navigator.userAgent,
				index = agent.indexOf(name)
			if (index < 0) { return false }
			if (versionString) { index = agent.indexOf(versionString) }
			client.version = parseFloat(agent.substr(index + (versionString || name).length + 1))
			client.name = name
			return true
		}
		client.isIE = isClient('MSIE')
		client.isFirefox = isClient('Firefox')
		client.isWebkit = client.isWebKit = isClient('WebKit')
		client.isChrome = isClient('Chrome')
		client.isSafari = !client.isChrome && isClient('Safari', 'Version')
		client.isIPhone = isClient('iPhone', 'Version')
		client.isIPad = isClient('iPad', 'Version')
		client.isIPod = isClient('iPod', 'Version')
	},

	isQuirksMode: function(doc) {
		// in IE, if compatMode is undefined (early ie) or explicitly set to BackCompat, we're in quirks
		return this.isIE && (!doc.compatMode || doc.compatMode == 'BackCompat')
	}
}

module.exports.init()
