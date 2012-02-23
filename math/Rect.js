var Class = require('../Class')

module.exports = Class(function() {
	
	this.init = function(x, y, w, h) {
		this.x = x
		this.y = y
		this._x2 = x + w
		this._y2 = y + h
	}
	
	this.pad = function(amount) {
		this.x -= amount
		this.y -= amount
		this._x2 += amount
		this._y2 += amount
		return this
	}
	
	this.containsPoint = function(point) {
		return this.x < point.x && point.x < this._x2
			&& this.y < point.y && point.y < this._y2
	}
	
})