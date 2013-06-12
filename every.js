var nextTick = require('./nextTick')

module.exports = function every(intervalInMs, fn) {
	if (typeof intervalInMs != 'number') { throw new Error('every() expects a number') }
	nextTick(function executeAndSchedule() {
		setTimeout(executeAndSchedule, intervalInMs)
		fn()
	})
}
