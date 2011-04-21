/*
	Delay the execution of a function.
	If the function gets called multiple times during a delay, the delayed function gets invoced only once,
	with the arguments of the most recent invocation. This is useful for expensive functions that should
	not be called multiple times during a short time interval, e.g. rendering
	
	Example usage:

	Class(UIComponent, function() {
		this.render = delay(function() {
			...
		}, 250) // render at most 4 times per second
	})

	// Bath messages into a single email
	var EmailBatcher = Class(function() {
		this._init = function() {
			this._queue = []
		}

		this.send = function(email) {
			this._queue.push(email)
			this._scheduleDispatch()
		}

		this._scheduleDispatch = delay(function() {
			smtp.send(this._queue.join('\n\n'))
			this._queue = []
		}, 5000) // send emails at most once every 5 seconds
	})
*/
	
module.exports = function(fn, delay) {
	if (typeof delay != 'number') { delay = 50 }
	var timeout
	var delayedFn = function delayed() {
		if (timeout) { return }
		var args = arguments,
			self = this
		timeout = setTimeout(function() {
			delayedFn.clear()
			fn.apply(self, args)
		}, delay)
	}
	delayedFn.clear = function() {
		clearTimeout(timeout)
		timeout = null
	}
	return delayedFn
}

