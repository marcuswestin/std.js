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

	this.render = function(doc) {
		this._doc = doc
		this._el = create(this._tag, null, this._doc)
		this.renderContent()
		return this
	}
	
	this.create = function(tag, properties) { return create(tag, properties, this._doc) }
	this.append = function(element) { return this._el.appendChild(element) }
	this.getOffset = function() { return getOffset(this._el) }

	this.appendTo = function(element) { element.appendChild(this._el); return this }
	this.style = function(styles) { style(this._el, styles); return this }
})