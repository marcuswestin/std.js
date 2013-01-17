module.exports = function serialMap(items, opts) {
	var i = 0
	var result = []
	var iterate = opts.iterate
	var finish = opts.finish
	var ctx = opts.context
	var filterNulls = opts.filterNulls || false
	var error = null
	// the given iterator may expect arguments (item + i + next), or just (item + i)
	var callIterator = (iterate.length == 3 ? iterate : function(item, i, next) { iterate.call(this, item, next) })
	function next() {
		if (i == items.length) { return finish.call(ctx, null, result) }
		var iterationI = i
		process.nextTick(function() {
			callIterator.call(ctx, items[iterationI], iterationI, iteratorCallback)
		})
		i += 1
	}
	function iteratorCallback(err, iterationResult) {
		if (error) { return }
		if (err) {
			error = err
			finish.call(ctx, err, null)
		} else {
			if (iterationResult != null || !filterNulls) {
				result.push(iterationResult)
			}
			next()
		}
	}
	next()
}