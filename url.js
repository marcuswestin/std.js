var Class = require('./Class'),
	map = require('std/map')

var URL = Class(function() {

	this._extractionRegex = new RegExp([
		'^', // start at the beginning of the string
		'((\\w+:)?//)?', // match a possible protocol, like http://, ftp://, or // for a relative url
		'(\\w[\\w\\.]+)?', // match a possible domain
		'(:\\d+)?', // match a possible port
		'(\\/[^\\?#]+)?', // match a possible path
		'(\\?[^#]+)?', // match possible GET parameters
		'(#.*)?' // match the rest of the URL as the hash
	].join(''), 'i')

	this.init = function(url) {
		var match = (url || '').toString().match(this._extractionRegex) || []
		this.protocol = match[2] || ''
		this.host = match[3] || ''
		this.port = match[4] || ''
		this.pathname = match[5] || ''
		this.search = (match[6]||'').substr(1)
		this.hash = (match[7]||'').substr(1)
	}

	this.toString = function() {
		return [
			this.protocol,
			this.host ? '//' + this.host : '',
			this.pathname,
			this.getSearch(),
			this.getHash()
		].join('')
	}

	this.toJSON = this.toString

	this.getTopLevelDomain = function() {
		if (!this.host) { return '' }
		var parts = this.host.split('.')
		return parts.slice(parts.length - 2).join('.')
	}
	
	this.getSearchParams = function() {
		if (this._searchParams) { return this._searchParams }
		return this._searchParams = this._parseParams(this.search) || {}
	}
	
	this.getHashParams = function() {
		if (this._hashParams) { return this._hashParams }
		return this._hashParams = this._parseParams(this.hash) || {}
	}
	
	this.addToSearch = function(key, val) { this.getSearchParams()[key] = val; return this }
	this.addToHash = function(key, val) { this.getHashParams()[key] = val; return this }
	this.removeFromSearch = function(key) { delete this.getSearchParams()[key]; return this }
	this.removeFromHash = function(key) { delete this.getHashParams()[key]; return this }
	
	this.getSearch = function() {
		return (
			this._searchParams ? '?' + this._getParamString(this._searchParams)
			: this.search ? '?' + this.search
			: '')
	}
	
	this.getHash = function() {
		return (
			this._hashParams ? '#' + this._getParamString(this._hashParams)
			: this.hash ? '?' + this.hash
			: '')
	}

	this._parseParams = function(paramString) {
		var parts = this.search.split('&'),
			params = {}
		for (var i=0; i<parts.length; i++) {
			var kvp = parts[i].split('=')
			params[decodeURIComponent(kvp[0])] = decodeURIComponent(kvp[1])
		}
	}
	
	this._getParamString = function(params) {
		return map(params, function(val, key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(val)
		}).join('&')
	}
})

module.exports = function url(url) { return new URL(url) }
