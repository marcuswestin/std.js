var Class = require('./Class'),
	bind = require('./bind'),
	slice = require('./slice')

module.exports = Class(function() {

	this._init = function() {
		this._subscribers = {}
	}
	
	this.on = function(signal, fn) {
		var subscribers = this._subscribers[signal]
		if (!subscribers) { subscribers = this._subscribers[signal] = [] }
		subscribers.push(fn)
		return this
	}

	this._publish = function(signal) {
		var args = slice(arguments, 1),
			subscribers = this._subscribers[signal]
		if (!signal) { return this }
		for (var i=0; i<subscribers.length; i++) {
			subscribers[i].apply(this, args)
		}
		return this
	}
})
