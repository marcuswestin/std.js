module.exports = function waitFor(num, callback) {
	var error
	return function(err, res) {
		if (num == 0) { return log.warn("waitFor was called more than the expected number of times") }
		if (error) { return }
		if (err) {
			error = err
			return callback(err)
		}
		num -= 1
		if (num == 0) { callback(null) }
	}
}
