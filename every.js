var nextTick = require('./nextTick')

module.exports = function every(intervalMs, fn) {
	nextTick(function executeAndSchedule() {
		setTimeout(executeAndSchedule, intervalMs)
		fn()
	})
}
