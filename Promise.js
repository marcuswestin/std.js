var Class = require('./Class'),
	invokeWith = require('./invokeWith'),
	slice = require('./slice'),
	each = require('./each'),
	bind = require('./bind')

module.exports = Class(function() {
	this.init = function() {
		this._dependants = []
		this._fulfillment = null
	}

	this.add = function(callback) {
		if (this._fulfillment) { callback.apply(this, this._fulfillment) }
		else { this._dependants.push(callback) }
	}

	this.fulfill = function(/* arg1, arg2, ...*/) {
		if (this._fulfillment) { throw new Error('Promise fulfilled twice') }
		this._fulfillment = slice(arguments)
		each(this._dependants, invokeWith.apply(this, this._fulfillment))
		delete this._dependants
	}
	
	this.nextTickAdd = function(callback) {
		setTimeout(bind(this, this.add, callback), 0)
	}
})
