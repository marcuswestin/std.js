var Class = require('../Class'),
	Publisher = require('../Publisher'),
	create = require('./create'),
	style = require('./style'),
	getOffset = require('./getOffset')

module.exports = Class(Publisher, function() {

	this._tag = 'div'
	
	this.init = function() {
		Publisher.prototype.init.apply(this)
	}

	this.render = function(win, el) {
		this._win = win
		this._doc = this._win.document
		this._el = el || create(this._tag, null, this._doc)
		this.createContent()
		return this
	}
	
	this.create = function(tag, properties) { return create(tag, properties, this._doc) }
	this.append = function(element) { return this._el.appendChild(element) }
	this.appendTo = function(element) { return element.appendChild(this._el) }
	this.getOffset = function() { return getOffset(this._el) }
})