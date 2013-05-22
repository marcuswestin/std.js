var nextTick = require('std/nextTick')
var isList = require('std/isList')

module.exports = function asyncEach(items, opts) {
	var finish = opts.finish
	if (typeof finish != 'function') { throw 'finish function is required' }
	
	var objectKeys = isList(items) ? null : keys(items)
	var numItems = isList(items) ? items.length : objectKeys.length
	
	if (!numItems) { return finish(null, []) }
	
	var parallel = opts.parallel
	if (parallel === true) { parallel = numItems }
	if (!parallel) { parallel = 1 }
	if (parallel > waitingFor) { parallel = waitingFor }

	var nextIndex = 0
	var result = []
	var errorResult = null
	var waitingFor = numItems
	var context = opts.context || this

	var iterator = module.exports.makeIterator(context, opts.iterate)
	
	function processNextItem() {
		if (!waitingFor) {
			return finish.call(context, null)
		}
		var iterationIndex = nextIndex
		if (iterationIndex == numItems) {
			// no more processing to be done - just wait for the remaining parallel requests to finish
			return
		}
		nextIndex += 1
		var key = objectKeys ? objectKeys[iterationIndex] : iterationIndex
		nextTick(function() {
			iterator(items[key], key, iteratorCallback)
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
