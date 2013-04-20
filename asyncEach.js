var nextTick = require('std/nextTick')

module.exports = function asyncEach(items, opts) {
	var finish = opts.finish
	if (typeof finish != 'function') { throw 'finish function is required' }
	
	if (!items.length) { return finish(null, []) }
	
	var parallel = opts.parallel
	if (parallel === true) { parallel = items.length }
	if (!parallel) { parallel = 1 }
	if (parallel > waitingFor) { parallel = waitingFor }

	var nextIndex = 0
	var result = []
	var errorResult = null
	var waitingFor = items.length
	var context = opts.context || this

	var iterator = module.exports.makeIterator(context, opts.iterate)
	
	function processNextItem() {
		if (!waitingFor) {
			return finish.call(context, null)
		}
		var iterationIndex = nextIndex
		if (iterationIndex == items.length) {
			// no more processing to be done - just wait for the remaining parallel requests to finish
			return
		}
		nextIndex += 1
		nextTick(function() {
			iterator(items[iterationIndex], iterationIndex, iteratorCallback)
		})
	}
	
	function iteratorCallback(err) {
		if (errorResult) { return }
		if (err) {
			errorResult = err
			finish.call(context, err, null)
		} else {
			waitingFor -= 1
			processNextItem()
		}
	}
	
	// starts `parallel` number of functions processing the array
	for (var parallelI=0; parallelI<parallel; parallelI++) {
		processNextItem()
	}
}

module.exports.makeIterator = function(context, iterate) {
	// the given iterator may expect arguments (item + i + next), or just (item + i)
	if (typeof iterate !== 'function') {
		throw new Error('iterate function is required')
	} else if (iterate.length == 2) {
		return function iterator2(item, i, next) {
			iterate.call(context, item, next)
		}
	} else if (iterate.length == 3) {
		return function iterator3(item, i, next) {
			iterate.call(context, item, i, next)
		}
	} else {
		throw new Error('iterate function must take 2 or 3 arguments')
	}
}
